import React from "react";
import { Button } from "components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "components/ui/card";
import { Checkbox } from "components/ui/checkbox";
import { Info } from "lucide-react";

export const DeactivateAccountSection = () => {
  return (
    <Card className="mt-6">
      <CardHeader className="border-b border-gray-200 font-bold">
        Deactivate Account
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex space-x-4 p-3 items-center bg-[#fff8dc] m-6 border border-dashed border-yellow-500 rounded-lg">
          <Info className="w-8 h-8 text-[#ffc701]" />
          <div>
            <h2 className="font-semibold mb-[2px]">
              You Are Deactivating Your Account !
            </h2>
            <p className="text-sm text-gray-500 font-medium">
              <span>
                <div>
                  For extra security, this requires you to confirm your email or
                  phone number when you reset yousignr password.
                </div>
                <div className="text-primary mt-1">Learn more</div>
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <Checkbox id="confirm" />
          <label
            htmlFor="confirm"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I confirm my account deactivation
          </label>
        </div>
      </CardContent>
      <CardFooter className="pt-6 border-t border-gray-200 flex justify-end">
        <Button className="bg-red-400 hover:bg-red-500 text-white">
          Deactivate Account
        </Button>
      </CardFooter>
    </Card>
  );
};
