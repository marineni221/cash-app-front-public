import React from "react";
import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import { LoginScreen } from "pages/Auth/LoginScreen";
import OtpCodeScreen from "pages/Auth/OtpCodeScreen";
import HomeScreen from "pages/HomeScreen";
import PasswordForgotten from "pages/Auth/PasswordForgotten";
import CreatePasswordScreen from "pages/Auth/CreatePasswordScreen";
import { DashboardScreen } from "pages/DashboardScreen";
import { CampaignsScreen } from "pages/CampaignScreen/CampaignsScreen";
import { AccountsScreen } from "pages/AccountScreen/AccountsScreen";
import { SettingsScreen } from "pages/SettingsScreen";
import AuthScreen from "pages/Auth/AuthScreen";
import ErrorScreen from "pages/ErrorScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorScreen />,
    children: [
      { path: "", element: <HomeScreen /> },
      { path: "/dashboard", element: <DashboardScreen /> },
      { path: "/campaigns", element: <CampaignsScreen /> },
      { path: "/accounts", element: <AccountsScreen /> },
      { path: "/settings", element: <SettingsScreen /> },
    ],
  },
  {
    path: "auth",
    element: <AuthScreen />,
    children: [
      { path: "login", element: <LoginScreen /> },
      { path: "otp-verification", element: <OtpCodeScreen /> },
      { path: "password-forgotten", element: <PasswordForgotten /> },
      {
        path: "create-password/:token",
        element: <CreatePasswordScreen />,
      },
    ],
  },
]);
