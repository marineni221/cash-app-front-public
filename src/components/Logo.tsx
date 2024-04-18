import React from "react";
import verifyEmail from "assets/auth/please-verify-your-email.png";

export const Logo = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-5">
      <div className="w-[70px] h-[70px] rounded-full">
        <img src={verifyEmail} alt="" className="w-full h-full object-cover rounded-full" />
      </div>
      <span className="font-bold text-xl text-white md:text-3xl">Cash App</span>
    </div>
  );
};
