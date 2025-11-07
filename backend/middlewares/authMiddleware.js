import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
//import ErrorHandler from "../utils/errorHandler.js";
import ErrorHandler from "../middlewares/errorMiddleware.js"; 
//import borrowRouter from "../routes/borrowRouter.js";
// checks if the user is authenticated or not
export const isAuthenticated = catchAsyncErrors(async(req,res,next)=>{
  const {token} = req.cookies; // get token from cookies
  if(!token){
    return next(new ErrorHandler(" user is not authenticated ",401));
  } 
  const decoded = jwt.verify(token,process.env.JWT_SECRET); // verify the token
  console.log(decoded);
  req.user = await User.findById(decoded.id); // get the user from the token
  next();
});


/*
const statament  = " My name is John and I am a student ";

statament.includes("John") // true
statament.includes("Doe") // false

*/

// handling user roles
export const authorizedRoles = (...roles) => { // rest operator to get all roles
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) { 
      return next(new ErrorHandler(`Role:(${req.user.role}) is not allowed to access this resource`, 403));
    }
    next();
  }
}

