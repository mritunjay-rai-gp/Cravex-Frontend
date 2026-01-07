import React from "react";
import { AiOutlineHome, AiOutlineHeart, AiOutlinePlusSquare, AiOutlineLogout, AiOutlineProfile, AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router";
function Sidebar({ open }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("user")
    navigate("/login",{replace:true})
  };
  return (
    <div 
      className={`fixed top-0 left-0 h-full w-60 bg-black/90 text-white p-6 transition-transform duration-300 z-50
                 ${open ? 'translate-x-0' : '-translate-x-full'}`}
    >

      <h2 className="text-2xl font-bold mb-8">CraveX 🍽️</h2>

      <ul className="flex flex-col gap-6 text-lg">
        <li className="hover:text-orange-400 cursor-pointer flex items-center gap-2"><AiOutlineHome/> <Link to="/dashboard">Home</Link></li>
        <li className="hover:text-orange-400 cursor-pointer flex items-center gap-2"><AiOutlineHeart/> <Link to="/favourites">Favourites</Link> </li>
        <li className="hover:text-orange-400 cursor-pointer flex items-center gap-2"><AiOutlinePlusSquare/><Link to="/add-recipe">Add Recipe</Link> </li>
        <li className="hover:text-orange-400 cursor-pointer flex items-center gap-2"><AiOutlineProfile/><Link to="/my-recipes">My Recipes</Link> </li>
        <li className="hover:text-orange-400 cursor-pointer flex items-center gap-2"><AiOutlineUser/> <Link to={`/user/${user.userName}`}>Profile</Link></li>
        <li className="hover:text-orange-400 cursor-pointer flex items-center gap-2" onClick={handleLogout}><AiOutlineLogout onClick={handleLogout}/> Logout</li>
      </ul>
    </div>
  );
}

export default Sidebar;
