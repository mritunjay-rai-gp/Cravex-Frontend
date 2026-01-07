import React, {useState} from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
function OtpVerify(){
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state?.userId;
    const [otp,setOtp] = useState("");
    const handleVerify = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("https://cravex-backend-ln7p.onrender.com/user/verifyOtp",{
                userId,
                otp
            });
            alert("Email verified succesfully!");
            navigate("/login");
        }catch(err){
            alert("Invalid or expire otp ❌");
        }
    };
    return (
        <div className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{backgroundImage:`url('https://i.pinimg.com/736x/b2/24/ba/b224bae0222627f98fb20ae546fe9c85.jpg')`}}>
      
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 bg-white/10 backdrop-blur-lg p-10 rounded-xl text-white w-{350px}">
        <h2 className="text-2xl mb-4 font-bold text-center">Verify OTP</h2>

        <p className="text-sm mb-4 text-center text-gray-300">
          Enter the 6-digit OTP sent to your email 📩
        </p>

        <form onSubmit={handleVerify} className="flex flex-col gap-4">

          <input
            type="number"
            className="p-2 rounded bg-white/20 outline-none focus:bg-white/30 text-center text-xl tracking-widest"
            placeholder="Enter OTP"
            onChange={(e)=>setOtp(e.target.value)}
            required
          />

          <button className="bg-[#FF890C] hover:bg-[#FFA53C] py-2 rounded font-semibold">
            Verify OTP
          </button>
        </form>

      </div>
    </div>
  );
    
}
export default OtpVerify;