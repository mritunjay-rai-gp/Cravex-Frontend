import { Link, useNavigate } from "react-router";
import React, {useState} from "react";
import axios from 'axios'
function Signup() {
  const[form,setForm]=useState({
    userName:"",
    email: "",
    password: "",
    confirmPassword:""
  })
  const navigate = useNavigate()
  const handleInput = (e)=> {
    setForm({...form, [e.target.name]: e.target.value});
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(form.password !== form.confirmPassword){
      return alert("Password do not match!");
    }
    try{
      const response = await axios.post("https://cravex-backend-ln7p.onrender.com/user/register",form);
      navigate("/otpVerify",{state: {userId: response.data.userId}});
      console.log(response.data);
    }
    catch(err){
      alert("Error: "+ (err.response?.data||err.message));
    }
  }
return (
  <div
    className="min-h-screen w-full bg-cover bg-center flex items-center justify-center relative"
    style={{
      backgroundImage:
        "url('https://i.pinimg.com/736x/b2/24/ba/b224bae0222627f98fb20ae546fe9c85.jpg')",
    }}
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/60"></div>

    {/* Main Container */}
    <div className="relative z-10 w-[92%] sm:w-[85%] md:w-[75%] max-w-5xl flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-xl backdrop-blur-md">

      {/* Left section (hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 text-white p-10 flex-col justify-center">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">
          Welcome to CraveX 🍽
        </h1>
        <p className="text-gray-200 text-base lg:text-lg leading-6">
          Create your account to explore delicious recipes, save favorites,
          share dishes & join the cooking community! 😋🔥
        </p>
        <p className="mt-6 italic text-gray-300">
          "Your kitchen journey starts here..."
        </p>
      </div>

      {/* Right - Signup Form */}
      <div className="w-full md:w-1/2 bg-white/10 backdrop-blur-lg p-6 sm:p-8 md:p-10 text-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm">Username</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-white/20 outline-none focus:bg-white/30"
              onChange={(e) =>
                setForm({ ...form, userName: e.target.value.toLowerCase() })
              }
              pattern="[a-z0-9_.]{5,20}"
              name="userName"
              required
            />
          </div>

          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-white/20 outline-none focus:bg-white/30"
              onChange={handleInput}
              name="email"
              required
            />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-white/20 outline-none focus:bg-white/30"
              onChange={handleInput}
              name="password"
              required
            />
          </div>

          <div>
            <label className="text-sm">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-white/20 outline-none focus:bg-white/30"
              onChange={handleInput}
              name="confirmPassword"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#FFB996] hover:bg-[#FF9F7F] text-black font-semibold py-2 rounded-lg mt-3 transition"
          >
            Send OTP
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-200">
          Already have an account?{" "}
          <Link to="/login" className="text-[#FFB996] underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  </div>
);

}

export default Signup;
