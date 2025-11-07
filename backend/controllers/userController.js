
import  User  from "../models/userModel.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import bcrypt from "bcrypt";
import cloudinary from 'cloudinary';



// Get all users
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({accountVerified: true})
  if (!users) {
    return next(new ErrorHandler("No users found", 404));
  }
  res.status(200).json({
    success: true,
    users
  }); 

});


// Register new Admin
export const registerNewAdmin = catchAsyncErrors(async (req, res, next) => {
 if(!req.files || Object.keys(req.files).length === 0){
    return next(new ErrorHandler("Admin avatar is required",400));
 }
  const {name,email,password} = req.body;
  if(!name || !email || !password){
    return next(new ErrorHandler(" Please enter all the fields ",400));
  }
  const isRegistered = await User.findOne({email, accountVerified: true});
  if(isRegistered){
    return next(new ErrorHandler(" User already registered ",409));
  }
  if(password.length < 8 || password.length > 16){
    return next(new ErrorHandler(" Password must be between 8 and 16 characters ",400));
  }
  
// create user Avatar

const {avatar} = req.files;
const allowedformates = ["image/png","image/jpeg","image/webp"];

if(!allowedformates.includes(avatar.mimetype)){
  return next(new ErrorHandler("file format not supported",400));
}
 
const hashedPassword = await bcrypt.hash(password,10);

  const cloudinaryResponse = await cloudinary.uploader.upload(
    avatar.tempFilePath,{
    folder:"LIBRARY_MANAGEMENT_SYSTEM_ADMIN_AVATARS",
  });

  if(!cloudinaryResponse || cloudinaryResponse.error){
    console.error("Cloudinary error :", cloudinaryResponse.error || "Unknow cloudinary error");
    return next(new ErrorHandler("file to upload avatar image to cloudinary ", 500))

  }
  
  const admin = await User.create({
    name,
    email,
    password:hashedPassword,
    role:"Admin",
    accountVerified : true,
    avatar :{
      public_id : cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url
    }
  });

  res.status(201).json({
    success: true,
    message : "Admin registered successfully",
    admin,
  })



});