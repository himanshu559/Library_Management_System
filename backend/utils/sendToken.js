import dotenv from "dotenv";
dotenv.config();

//import { app } from "../app.js";

export const sendToken = async (user, statusCode, message, res) => {
  const token = await user.getJWTToken();

  console.log("Generated Token:", token); // Debugging line to check the token value

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
    .json({
      success: true,
      user,
      message,
      token,
    });

    console.log("Generated Token:", token);

};

export default sendToken;
