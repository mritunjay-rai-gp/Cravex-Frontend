import React, { useState } from "react";
import DashboardNavbar from "../DashboardNavbar";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router";

function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0F0F0F] text-white">

      {/* Sidebar */}
      <Sidebar open={open} />
            {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        ></div>
      )}

      <div className="flex-1">
        {/* Navbar fixed top */}
        <div className=" top-0 left-0 w-full z-50">
          <DashboardNavbar toggleSidebar={() => setOpen(!open)} />
        </div>

        {/* Page Content (below navbar) */}
        <div className="pt-20 px-6">  {/* padding top so navbar space maintained */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
