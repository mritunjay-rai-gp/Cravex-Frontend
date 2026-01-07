import axios from "axios";
import React, {useState} from "react";
import { Link, useNavigate } from "react-router";
function Login() {
  const [form,setForm]= useState({
    email:"",
    password:""
  })
  const handleInput = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  };
  const navigate= useNavigate();
  const handleLogin= async (e)=>{
    e.preventDefault();
    try{
      const res = await axios.post("https://cravex-backend-ln7p.onrender.com/user/loginUser",form);
      localStorage.setItem("token",res.data.token);
      localStorage.setItem("user",JSON.stringify(res.data.user));
      alert("Login successfully")
      navigate('/dashboard')
      console.log(res.data)
    }catch (err){
      alert("login falied"+ (err.response?.data|| err.message));
    }
  };
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

      {/* Left - Welcome text (hidden on small screens) */}
      <div className="hidden md:flex md:w-1/2 text-white p-10 flex-col justify-center">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">
          Welcome Back, Chef! 👨‍🍳
        </h1>
        <p className="text-gray-200 text-base lg:text-lg leading-6">
          Ready to create delicious magic again and bring your recipes to life?
          Dive into your culinary journey, explore dishes or continue cooking magic!
        </p>
        <p className="mt-6 italic text-gray-300">
          "The kitchen missed you!"
        </p>
      </div>

      {/* Right - Login Form */}
      <div className="w-full md:w-1/2 bg-white/10 backdrop-blur-lg p-6 sm:p-8 md:p-10 text-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-white/20 outline-none focus:bg-white/30"
              name="email"
              onChange={handleInput}
              required
            />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-white/20 outline-none focus:bg-white/30"
              name="password"
              onChange={handleInput}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#FFB996] hover:bg-[#FF9F7F] text-black font-semibold py-2 rounded-lg mt-3 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-200">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#FFB996] underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  </div>
);

}

export default Login;
