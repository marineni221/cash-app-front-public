import React from "react";
import NavBar from "components/NavBar";
import Sidebar from "components/Sidebar";
import { Toaster } from "components/ui/toaster";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <div className="w-full h-full bg-slate-50">
        <NavBar />
        <main>
          <Outlet />
        </main>

        <Toaster />
      </div>
    </div>
  );
};

export default Layout;
