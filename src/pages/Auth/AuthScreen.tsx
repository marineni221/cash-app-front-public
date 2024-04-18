import React from "react";
import { Toaster } from "components/ui/toaster";
import { Outlet } from "react-router";

const AuthScreen = () => {
  return <>
    <Outlet />
    <Toaster />
  </>;
};

export default AuthScreen;
