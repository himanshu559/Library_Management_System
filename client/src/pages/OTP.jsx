import React, { useEffect, useState } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { Link, Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { otpVerification, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
export const OTP = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const { loading, error, message, user,
    isAuthenticated } = useSelector(state => state.auth);


  const handleOptVerification = (e) => {
    e.preventDefault();
    // Dispatch OTP verification action here
    //const data = { email, otp };
    dispatch(otpVerification(email, otp));
  }

  useEffect(() => {
    // if (message) {
    //   toast.success(message);
    // }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading]);

  if (isAuthenticated) {
    return <Navigate to={"/"} />
  }
  return <>
    <div className="flex flex-col justify-center md:flex-row h-screen ">
      {/* left Side */}
      <div className="w-full md:w-1/2 bg-white md:flex flex-col items-center justify-center p-8 relative">

        <Link to={"/register"} className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 -left-28 hover:bg-black hover:text-white transition duration-300 text-end ">Back</Link>
        <div className="mx--w-sm w-full">
          <div className="flex justify-center mb-12">
            <div className="rounded-full flex justify-center items-center">
              <img src={logo} alt="logo" className="h-24 w-auto" />
            </div>
          </div>
          <h2 className="text-4xl mb-12 font-medium text-center overflow-hidden">Check Your Mail</h2>
          <p className="text-gray-800 text-center mb-12">Please Enter Your OTP</p>
          <form onSubmit={handleOptVerification}>
            <div className="mb-4">
              <input
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-black"
            />

            </div>
            <button
              type="submit"
              className="border-2 mt-5 border-white w-full font-semibold bg-black text-white py-2 px-8 rounded-lg hover:bg-white hover:text-black transition"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
      {/* Right Side */}
      <div className=" hidden w-full md:w-1/2 bg-black text-white  flex-col items-center justify-center p-8 rounded-tl-[80px]  rounded-bl-[80px] md:flex">
  <div className="text-center h-[400px]">
    <div className="flex justify-center mb-12"> 
      <img src={logo_with_title} alt="logo with title" className=" mb-12 h-44 w-auto"/>
    </div>
    <p className="text-gray-300 mb-12">New To your platform? Sign up Now </p> <Link to={"/register"}  className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition">Sign Up</Link>
  </div>
      </div>
    </div>
  </>
};

export default OTP;
