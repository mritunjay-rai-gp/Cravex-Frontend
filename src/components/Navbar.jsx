
import React, { useState } from "react";
import { Link } from "react-router";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../assets/logoC.jpg";

function Navbar() {
const [open, setOpen] = useState(false);

return ( <nav className="w-full bg-black/50 absolute top-0 left-0 h-20 flex items-center justify-between px-6 text-white z-50">


  {/* Logo */}
  <div className="flex items-center gap-2">
    <img src={logo} alt="logo" className="w-12 rounded-2xl" />
    <span className="font-bold text-xl">CraveX</span>
  </div>

  {/* Desktop Links */}
  <div className="hidden md:flex gap-6 text-lg">
    <Link to="/" className="hover:text-orange-300">Home</Link>
    <Link to="/about" className="hover:text-orange-300">About</Link>
    <Link to="/help" className="hover:text-orange-300">Help</Link>
    <Link to="/contactUs" className="hover:text-orange-300">Contact Us</Link>
  </div>

  {/* Hamburger */}
  <button
    className="md:hidden text-3xl"
    onClick={() => setOpen(!open)}
  >
    {open ? <HiX /> : <HiMenu />}
  </button>

  {/* Mobile Drawer */}
  {open && (
    <div className="absolute top-20 right-0 w-full bg-black/90 flex flex-col items-center py-4 gap-4 text-lg md:hidden">
      <Link onClick={() => setOpen(false)} to="/" className="hover:text-orange-300">Home</Link>
      <Link onClick={() => setOpen(false)} to="/about" className="hover:text-orange-300">About</Link>
      <Link onClick={() => setOpen(false)} to="/help" className="hover:text-orange-300">Help</Link>
      <Link onClick={() => setOpen(false)} to="/contactUs" className="hover:text-orange-300">Contact Us</Link>
    </div>
  )}
</nav>


);
}

export default Navbar;
