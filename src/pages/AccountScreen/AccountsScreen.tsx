import { Card } from "components/ui/card";
import React, { useState } from "react";
import avatar from "assets/avatars/300-23.jpg";
import { Button } from "components/ui/button";
import {
  BadgeCheck,
  CircleUser,
  Ellipsis,
  Mail,
  MapPin,
  MoveDown,
  MoveUp,
} from "lucide-react";
import { Progress } from "components/ui/progress";
import { useLocation } from "react-router";
import {
  BrowserTypes,
  OsTypes,
  deviceType,
  engineName,
  browserName,
  deviceDetect,
  fullBrowserVersion,
  browserVersion,
  engineVersion,
  osName,
  osVersion,
} from "react-device-detect";
import { ProfileDetailsSection } from "./components/ProfileDetailsSection";
import { ProfileDetailsFormSection } from "./components/ProfileDetailsFormSection";
import { SignInMethodSection } from "./components/SignInMethodSection";
import { NotificationSection } from "./components/NotificationSection";
import { DeactivateAccountSection } from "./components/DeactivateAccountSection";
import { LoginSessionSection } from "./components/LoginSessionSection";

const deviceInfos = {
  browserType: BrowserTypes,
  osType: OsTypes,
  deviceType: deviceType,
  engineName,
  browserName,
  deviceDetect,
  fullBrowserVersion,
  browserVersion,
  engineVersion,
  osName,
  osVersion,
};

for (const [key, value] of Object.entries(deviceInfos)) {
  console.log(`${key} => ${value}`);
}

const menuItems = ["overview", "settings", "logs"];

export const AccountsScreen = () => {
  const [activeItem, setActiveItem] = useState(menuItems[0]);
  const activeMenuItem =
    activeItem.charAt(0).toUpperCase() + activeItem.slice(1);
  const { state } = useLocation();
  const active = state?.active;

  React.useEffect(() => {
    if (active) {
      setActiveItem(active);
    }
  }, [active]);

  React.useEffect(() => {
    async function getUserCityName(latitude: number, longitude: number) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      const city = data.address.city;
      const country = data.address.country;
      console.log("city name and country => ", city, country);
    }

    async function getIPAddress() {
      const response = await fetch("https://api64.ipify.org?format=json");
      const data = await response.json();
      const IPAddress = data.ip;
      console.log("ip address => ", IPAddress);
    }

    getIPAddress();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }

    function success(position: any) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      getUserCityName(latitude, longitude);
      console.log("position: ", position);
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }

    function error() {
      console.log("Unable to retrieve your location");
    }
  }, []);

  return (
    <div className="p-6 h-[calc(100vh-80px)] font-poppins overflow-auto">
      <h1 className="font-medium text-xl">{activeMenuItem}</h1>
      <span className="text-sm font-light">
        Account -{" "}
        <strong className="text-sm font-medium">{activeMenuItem}</strong>
      </span>
      <Card className="mt-6 p-6 flex relative">
        <div className="w-[200px] h-[200px] rounded-lg relative bg-cyan-800">
          <img
            src={avatar}
            className="w-full h-full object-cover rounded-lg"
            alt=""
          />
          <div className="absolute w-6 h-6 rounded-full border-4 border-white bg-green-500 -right-4 top-[70%]"></div>
        </div>

        <div className="w-full h-[260px] pl-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-medium">Zal Ben Hassan</h1>
                <BadgeCheck className="text-blue-400 w-5 h-5" />
                <span className="bg-green-50 text-green-500 hover:bg-green-500 cursor-pointer duration-300 hover:text-white font-medium px-2 py-1 rounded-2xl text-xs">
                  Upgrade to Pro
                </span>
              </div>

              <div className="mt-2 flex space-x-3">
                <div className="flex items-center space-x-1">
                  <CircleUser className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-xs">Developper</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-xs">922 (ES) Avenue</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-xs">
                    zal.ben@hotmail.fr
                  </span>
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <div className="w-[120px] border border-slate-300 border-dashed rounded-md p-2">
                  <div className="flex items-center space-x-2">
                    <MoveUp className="w-4 h-4 text-green-300" />
                    <span className="font-semibold text-xl">$4520</span>
                  </div>
                  <span className="text-sm text-gray-500">Earnings</span>
                </div>

                <div className="w-[120px] border border-slate-300 border-dashed rounded-md p-2">
                  <div className="flex items-center space-x-2">
                    <MoveDown className="w-4 h-4 text-red-300" />
                    <span className="font-semibold text-xl">63</span>
                  </div>
                  <span className="text-sm text-gray-500">Campaigns</span>
                </div>

                <div className="w-[120px] border border-slate-300 border-dashed rounded-md p-2">
                  <div className="flex items-center space-x-2">
                    <MoveUp className="w-4 h-4 text-green-300" />
                    <span className="font-semibold text-xl">57%</span>
                  </div>
                  <span className="text-sm text-gray-500">Success Rate</span>
                </div>
              </div>

              <div className="mt-8 w-[300px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400 font-medium">
                    Profile Completion
                  </span>
                  <span className="font-semibold text-sm">65%</span>
                </div>
                <Progress value={65} className="h-[5px]" />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button className="text-gray-500 bg-slate-50" variant={"outline"}>
                Follow
              </Button>
              <Button>Hire</Button>
              <div className="bg-slate-50 hover:bg-slate-100 cursor-pointer p-2 grid place-items-center rounded-lg">
                <Ellipsis className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute flex items-center space-x-4 bottom-0 left-8">
          {menuItems.map((menuItem) => {
            const currentMenuItem =
              menuItem.charAt(0).toUpperCase() + menuItem.slice(1);
            if (menuItem === activeItem) {
              return (
                <button
                  onClick={() => setActiveItem(menuItem)}
                  key={menuItem}
                  className="border-b-[1.5px] border-primary p-4 text-primary font-medium"
                >
                  {currentMenuItem}
                </button>
              );
            }

            return (
              <button
                onClick={() => setActiveItem(menuItem)}
                key={menuItem}
                className="p-4 text-gray-500"
              >
                {currentMenuItem}
              </button>
            );
          })}
        </div>
      </Card>

      {activeItem === "overview" && <ProfileDetailsSection />}

      {activeItem === "settings" && (
        <>
          <ProfileDetailsFormSection />
          <SignInMethodSection />
          <NotificationSection />
          <DeactivateAccountSection />
        </>
      )}

      {activeItem === "logs" && (
        <LoginSessionSection />
      )}
    </div>
  );
};
