import React from 'react'
import { Link } from 'react-router'
import logo from '../assets/logoC.jpg'
function Navbar() {
  return (
        <div className='navbar w-full h-20  bg-black/50 flex items-center justify-between absolute'>
          <div className="logo flex items-center text-white align-middle gap-1 ml-10">
            <img src={logo} alt='logo' className='rounded-2xl w-12'/>
            <span className='font-bold text-xl'>CraveX</span>
          </div>
          <div className='navLinks text-white text-xl flex gap-3 items-center align-middle right-0 absolute mr-5'>
            <Link to='/' className='hover:text-orange-300 cursor-pointer'>Home</Link>
            <Link to='/about' className='hover:text-orange-300'>About</Link>
            <Link to='/help' className='hover:text-orange-300'>Help</Link>
            <Link to='/contactUs' className='hover:text-orange-300'>Contact Us</Link>
          </div>
        </div>   
  )
}

export default Navbar