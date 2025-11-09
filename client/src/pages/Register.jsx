import React from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useSelector, useDispatch } from "react-redux";
import { Form, Link, Navigate, useNavigate } from "react-router-dom";
import { register, resetAuthSlice } from "../store/slices/authSlice";
import { use } from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify"; 
const Register = () => {
  const { loading, error, message,user,
  isAuthenticated } = useSelector(state => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const dispatch = useDispatch(); 


  const navigateTo = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Dispatch register action here

    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);

    dispatch(register(data));
  }

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
      navigateTo (`/otp-verification/${email}`);
    }
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

  {/* left side */}
  <div className=" hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px] "> 
    <div className="text-center mb-12 h-[376px] ">
      <div  className="flex justify-center mb-12">
        <img src={logo_with_title} alt="Logo with Title"  className="mb-12 h-44 w-auto "/>
      </div>
      <p className="text-gray-300 mb-12"> Already Have Account ? Sign in Now</p>
      <Link to={"/login"} className="border-2 rounded-lg font-semibold border-white py-2 px-8 hover:bg-white hover:text-black transition">Sign In</Link>
    </div>
  </div>
 {/* RightSide */}
<div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 "> 
<div className="max-w-md w-full">
  <div className="flex justify-center mb-8 md:mb-12">
 <div className="flex flex-col-reverse sm:flex-row items-center justify-center mb-8 md:mb-12 gap-3">
  <h3 className="font-medium text-4xl overflow-hidden">Sign Up</h3>
  <img src={logo} alt=" logo" className="h-auto w-24 object-cover" />
 </div>
  </div>
  <p className="text-gray-600 mb-6 text-center ">Please provide your information to sign up</p>
  <form
  onSubmit={handleRegister}
  className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6 border border-gray-200"
>
  <h2 className="text-2xl font-semibold text-center text-gray-800">
    Create an Account
  </h2>
  <p className="text-center text-gray-500 text-sm">
    Join us and start your journey today
  </p>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Full Name
    </label>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/70 transition"
      placeholder="John Doe"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Email Address
    </label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/70 transition"
      placeholder="you@example.com"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Password
    </label>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/70 transition"
      placeholder="••••••••"
    />
  </div>

  <button
    type="submit"
    className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition duration-200"
  >
    Sign Up
  </button>

  <p className="text-center text-sm text-gray-600">
    Already have an account?{" "}
    <Link to={"/login"} className="border-2 rounded-lg font-semibold border-white py-2 px-8 hover:bg-white hover:text-black transition">Login</Link>
  </p>
</form>

</div>
</div>
</div>


  </>; 
};

export default Register;
