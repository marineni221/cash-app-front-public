import React from "react";
import { Card, CardContent, CardHeader } from "components/ui/card";
import { Checkbox } from "components/ui/checkbox";
import { BellRing } from "lucide-react";

export const NotificationSection = () => {
  return (
    <Card className="mt-6">
      <CardHeader className="text-lg font-bold border-b border-gray-200">
        <div className="flex space-x-3 items-center">
          <BellRing className="w-5 h-5 text-primary" />
          <span>Notifications</span>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-5 border-b border-gray-100 pb-4">
          <div className="col-span-3 font-semibold">Notification</div>
          <div className="grid grid-cols-2 col-span-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="email-1" />
              <label
                htmlFor="email-1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="phone-1" />
              <label
                htmlFor="phone-1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Phone
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 mt-4 border-b border-gray-100 pb-4">
          <div className="col-span-3 flex flex-col">
            <span className="font-medium">Campaigns Creation</span>
            <span className="text-sm mt-1 text-gray-400">
              Recieve a notification if a new campaign is started
            </span>
          </div>
          <div className="grid grid-cols-2 col-span-2">
            <Checkbox id="email" />
            <Checkbox id="phone" />
          </div>
        </div>

        <div className="grid grid-cols-5 mt-4 border-b border-gray-100 pb-4">
          <div className="col-span-3 flex flex-col">
            <span className="font-medium">Account Check</span>
            <span className="text-sm mt-1 text-gray-400">
              Recieve a notification if your email or phone is used to connect
              to a new device
            </span>
          </div>
          <div className="grid grid-cols-2 col-span-2">
            <Checkbox id="email" />
            <Checkbox id="phone" />
          </div>
        </div>

        <div className="grid grid-cols-5 mt-4 border-b border-gray-100 pb-4">
          <div className="col-span-3 flex flex-col">
            <span className="font-medium">Completed Deposit</span>
            <span className="text-sm mt-1 text-gray-400">
              Recieve a notification if a new deposit is successfully completed
            </span>
          </div>
          <div className="grid grid-cols-2 col-span-2">
            <Checkbox id="email" />
            <Checkbox id="phone" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
