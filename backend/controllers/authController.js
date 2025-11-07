import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import crypto from "crypto";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import sendVerificationCode from "../utils/sendVerificationCode.js";
import { sendToken } from "../utils/sendToken.js";
import { generateForgotPasswordEmailTemplate } from "../utils/emailTemplates.js";
import sendEmail from "../utils/sendEmail.js";

// User Registration Controller
export const register = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    if (!name || !email || !password) {
      console.log("All fields are required");
      return next(new ErrorHandler(" please Enter the All field ", 400));
    }

    const isRegisted = await User.findOne({ email, accountVerified: true });
    console.log(isRegisted);
    if (isRegisted) {
      return next(new ErrorHandler("User Already Exits ", 400));
    }

    const registationAttemptByUser = await User.find({
      email,
      accountVerified: false,
    });
    console.log(registationAttemptByUser);

    if (registationAttemptByUser.length > 5) {
      return next(
        new ErrorHandler(
          "You have exceeded the number of registation attempts please try again later",
          400
        )
      );
    }

    if (password.length < 8 || password.length > 16) {
      return next(
        new ErrorHandler("Password must be between 8 to 16 characters", 400)
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10); // hashing the password with salt rounds 10

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const verificationCode = await user.generateVerificationCode();
    await user.save();
    sendVerificationCode(verificationCode, email, res);
  } catch (error) {
    return next(new ErrorHandler(" Internal Server Error", 500));
  }
});

// Verify OTP Controller
export const verifyOTP = catchAsyncErrors(async (req, res, next) => {
  const { email, otp } = req.body;
  console.log(email, otp);
  if (!email || !otp) {
    return next(new ErrorHandler(" Email and opt Are Missing ", 400));
  }

  try {
    const userAllEntries = await User.find({
      email,
      accountVerified: false,
    }).sort({ createdAt: -1 }); // get all entries of the user with the email sorted by createdAt in descending order

    console.log(userAllEntries);

    if (!userAllEntries) {
      return next(new ErrorHandler(" User Not Found * ", 400));
    }

    let user;

    if (userAllEntries.length > 1) {
      // if there are multiple entries with the same email and not verified
      user = userAllEntries[0]; // get the most recent entry
      await User.deleteMany({
        // delete all other entries except the most recent one
        _id: { $ne: user._id }, // not equal to the most recent entry id
        email: email, // same email
        accountVerified: false, // not verified
      }); // delete all other entries except the most recent one
    } else {
      user = userAllEntries[0]; // if there is only one entry with the email and not verified
    }

    if (user.verificationCode !== Number(otp)) {
      return next(new ErrorHandler(" Invalid OTP ", 400));
    }

    const currentTime = new Date(); // Get the current time

    const verificationCodeExpire = new Date( // Convert to Date object
      user.verificationCodeExpire
    ).getTime(); // Convert to timestamp

    if (currentTime > verificationCodeExpire) {
      return next(new ErrorHandler(" OTP Expired ", 400));
    }

    user.accountVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpire = null;

    await user.save({ validateModifiedOnly: true }); // save the user without validating other fields

    console.log(user);

    sendToken(user, 201, "Account Verified ", res);
  } catch (error) {
    return next(new ErrorHandler(" Internal Server Error", 500));
  }
});

// Login User Controller
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

 console.log("email:-", email, "password:-", password);

  if (!email || !password) {
    return next(new ErrorHandler(" please Enter the All field ", 400));
  }

  try {
    const user = await User.findOne({ email, accountVerified: true }).select(
      "+password"
    );

    if (!user) {
      return next(new ErrorHandler("user Email and password not found", 400));
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password); // compare    the   password with the hashed password stored in the database

    if (!isPasswordMatched) {
      return next(new ErrorHandler("user Email and password not found", 400));
    }

    sendToken(user, 200, `Welcome back , ${user.name}`, res);
  } catch (error) {
    return next(new ErrorHandler(" Internal Server Error", 500));
  }
});

// Logout User Controller
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: " data Logged out successfully ",
    });
});

// Get User Details Controller
export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id); // req.user is set in the           isAuthenticated middleware
  if (!user) {
    return next(new ErrorHandler(" user not found ", 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// Forgot Password Controller
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  if (!req.body.email) {
    return next(new ErrorHandler(" Email Is required ", 400));
  }

  const user = await User.findOne({
    email: req.body.email,
    accountVerified: true,
  });
  if (!user) {
    return next(new ErrorHandler(" user not found || Invalid Email ", 404));
  }
  const resetToken = await user.getResetPasswordToken(); // generate the reset token
  console.log(resetToken);
  await user.save({ validateBeforeSave: false }); //this is my change 
   // save the user without validating other fields
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  const message = generateForgotPasswordEmailTemplate(resetPasswordUrl); // generate the email template

  console.log(message);

  try {
    await sendEmail({
      email: user.email,
      subject: "Library Management System Password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password Controller
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;

  console.log(token);
  
  if (!token) {
    return next(new ErrorHandler(" Reset Password Token Is Missing ", 400));
  }
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

    console.log("Received Token: " + token);

    console.log("Hashed Token: " + resetPasswordToken);


  const DBuser = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }, // check if the token is not expired
  });

  console.log("User Found:", DBuser);

  console.log("Token in DB:(hashed)",DBuser.resetPasswordToken);
  console.log("Token Expiry in DB:",DBuser.resetPasswordExpire);
  if (!DBuser) {
    return next(
      new ErrorHandler(" Reset Password Token Is Invalid Or Expired ", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler(" Password Does Not Match ", 400));
  }

  if (
    req.body.password.length < 8 ||
    req.body.password.length > 16 ||
    req.body.confirmPassword.length < 8 ||
    req.body.confirmPassword.length > 16
  ) {
    return next(
      new ErrorHandler(" Password must be between 8 to 16 characters ", 400)
    );
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10); // hash the new password
  DBuser.password = hashedPassword;
  DBuser.resetPasswordToken = undefined;
  DBuser.resetPasswordExpire = undefined;

  await DBuser.save();

  sendToken(DBuser, 200, "Password Reset Successfully", res);
});









// Update Password Controller
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password"); // req.user is set in the isAuthenticated middleware

  if (!user) {
    return next(new ErrorHandler(" user not found ", 404));
  }

  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return next(new ErrorHandler(" All fields are required ", 400));
  }

  const isPasswordMatched = await bcrypt.compare(
    currentPassword,
    user.password 
  ); // compare the old password with the hashed password stored in the database

  if (!isPasswordMatched) {
    return next(new ErrorHandler(" current Password is incorrect ", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler(" Password Does Not Match ", 400));
  }
  if (
    newPassword.length < 8 ||
    newPassword.length > 16 ||
    confirmPassword.length < 8 ||
    confirmPassword.length > 16
  ) {
    return next(
      new ErrorHandler(" Password must be between 8 to 16 characters ", 400)
    );
  }

  
if(newPassword !== confirmPassword){
  return next(new ErrorHandler(" New Password must be different from Current Password ", 400));
}

  const hashedPassword = await bcrypt.hash(newPassword, 10); // hash the new password
  user.password = hashedPassword;

  await user.save();
  res.status(200).json({
    success: true,
    message: "Password Updated Successfully",
  });

  //sendToken(user, 200, "Password Updated Successfully", res);

});


