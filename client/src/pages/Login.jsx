import React, { useEffect } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const { loading, error, message,user,
  isAuthenticated } = useSelector(state => state.auth);

  const dispatch = useDispatch();

   const handleLogin = (e) => {
    e.preventDefault();
    // Dispatch login action here
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
   dispatch(login(data));
   }
 useEffect(() => {
    // if (message) {
    //   toast.success(message);
    //   dispatch(resetAuthSlice());
     
    // }
    if(error){
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [ dispatch,isAuthenticated, error,loading]);

  if(isAuthenticated){
    return <Navigate to={"/"} />
  }


  return <>
  
  <div className="flex flex-col justify-center md:flex-row h-screen ">
        {/* left Side */}
        <div className="w-full md:w-1/2 bg-white md:flex flex-col items-center justify-center p-8 relative">
          <div className="mx--w-sm w-full">
            <div className="flex justify-center mb-12">
              <div className="rounded-full flex justify-center items-center">
                <img src={logo} alt="logo" className="h-24 w-auto" />
              </div>
            </div>
            <h2 className="text-4xl mb-12 font-medium text-center overflow-hidden">WelCome back !!!</h2>
            <p className="text-gray-800 text-center mb-12">Please Enter to Credential to log in </p>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                type="email"
                value={email}
                
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-black"
              />
  
              </div>
              <div className="mb-4">
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-black"
              />
  
              </div>
      <Link to={"/password/forgot"} className="font-semibold text-black rounded-md mb-12">Forgot Password?</Link>
      <div className="block md:hidden text-semibold mt-5">
        <p>New to our platform? <Link to={"/register"} className="font-semibold hover:underline text-black">Sign Up</Link></p>
      </div>

              <button
                type="submit"
                className="border-2 mt-5 border-white w-full font-semibold bg-black text-white py-2 px-8 rounded-lg hover:bg-white hover:text-black transition"
              >
                Sign In
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
  
  
  </>;
};

export default Login;
