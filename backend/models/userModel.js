import mongoose, { model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import dotenv from "dotenv";
dotenv.config();

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // password will not be returned by default in queries
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    accountVerified: {
      type: Boolean,
      default: false,
    },
    borrowedBooks: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Borrow",
        },
        returned: {
          type: Boolean,
          default: false,
        },
        bookTitle: String,
        borrowDate: Date,
        dueDate: Date, // it self added
        returnDate: Date,
      },
    ],
    avatar: {
      public_id: String,
      url: String,
    },
    verificationCode: Number,
    verificationCodeExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// Generate and hash verification code
userSchema.methods.generateVerificationCode = async function () {
  function generateFiveDigitNumber() {
    const firstDigit = Math.floor(Math.random() * 9) + 1; // First digit should be between 1-9 // for Example 4
    const RemainingDigits = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0"); // 456 Remaining four digits can be between 0-9

    /*
  firstDigit = 4 as Number
  RemainingDigits = 0456 as String
  resulted :- 40456 as String 
  */

    return parseInt(firstDigit + RemainingDigits);
  }
  const verificationCode = generateFiveDigitNumber();
  this.verificationCode = verificationCode;
  this.verificationCodeExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  return verificationCode;
};

// JWT TOKEN
userSchema.methods.getJWTToken = async function () {
  // instance method to get JWT token
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    // payload data
    expiresIn: process.env.JWT_EXPIRE, // expire time
  });
};

// Generate Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generate Token
  const resetToken =  crypto.randomBytes(20).toString("hex"); // 6 digit random number as string

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes

  return resetToken;
};

 const User = model("User", userSchema);

export default User;