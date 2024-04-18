import React from "react";
import { Button } from "components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "components/ui/card";
import { Info } from "lucide-react";

export const ProfileDetailsSection = () => {
  return (
    <Card className="mt-6">
      <CardHeader className="border-b border-gray-200 flex-row items-center justify-between">
        <h1 className="text-xl font-bold">Profile Details</h1>
        <Button className="w-fit">Edit Profile</Button>
      </CardHeader>
      <CardContent className="mt-6">
        <div className="grid grid-cols-2 mb-3">
          <span className="text-gray-500 text-sm">Full Name</span>
          <span className="font-medium  text-sm">Zal Ben Hassan</span>
        </div>

        <div className="grid grid-cols-2 mb-4">
          <span className="text-gray-500 text-sm">Company</span>
          <span className="font-medium  text-sm">Planete Bank Inc.</span>
        </div>

        <div className="grid grid-cols-2 mb-4">
          <span className="text-gray-500 text-sm flex items-center space-x-1">
            <span>Contact Phone</span>
            <Info className="w-3 h-3 text-gray-500" />
          </span>
          <span className="font-medium text-sm space-x-1">
            <span>+221 78 145 25 99</span>
            <span className="px-2 py-[2px] bg-red-400 rounded-md text-xs text-white">
              Not Verified
            </span>
          </span>
        </div>

        <div className="grid grid-cols-2 mb-4">
          <span className="text-gray-500 text-sm">Company Site</span>
          <span className="font-medium  text-sm">planete-band.com</span>
        </div>

        <div className="grid grid-cols-2 mb-4">
          <span className="text-gray-500 text-sm flex items-center space-x-1">
            <span>Country</span>
            <div title="Country of origination">
              <Info className="w-3 h-3 text-gray-500" />
            </div>
          </span>
          <span className="font-medium  text-sm">Germany</span>
        </div>

        <div className="grid grid-cols-2 mb-4">
          <span className="text-gray-500 text-sm">Communication</span>
          <span className="font-medium  text-sm">Email, Phone</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="text-gray-500 text-sm">Allow Changes</span>
          <span className="font-medium  text-sm">Yes</span>
        </div>
      </CardContent>

      <CardFooter className="flex space-x-4 p-3 items-center bg-[#fff8dc] m-6 border border-dashed border-yellow-500 rounded-lg">
        <Info className="w-8 h-8 text-[#ffc701]" />
        <div>
          <h2 className="font-semibold mb-[2px]">We need your attention !</h2>
          <p className="text-sm text-gray-500 font-medium">
            <span>
              Your phone has not been verified yet. For more security Please
            </span>
            <button className="text-base font-medium ml-1 text-primary hover:opacity-80">
              verify your phone
            </button>
            <span>.</span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};
