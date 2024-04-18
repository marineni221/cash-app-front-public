import React from "react";
import { Button } from "components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "components/ui/card";
import { ShieldCheck } from "lucide-react";

export const SignInMethodSection = () => {
  return (
    <Card className="mt-6">
      <CardHeader className="border-b border-gray-200 font-bold">
        Sign-in Method
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-sm mb-1">Email Address</h1>
            <p className="text-xs text-gray-500 font-medium">
              zal-ben@hotmail.fr
            </p>
          </div>
          <Button className="bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-primary text-xs">
            Change Email
          </Button>
        </div>

        <div className="border border-dashed border-gray-100 my-6"></div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold mb-1 text-sm">Password</h1>
            <p className="text-xs text-gray-500 font-medium">***************</p>
          </div>
          <Button className="bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-primary text-xs">
            Reset your password
          </Button>
        </div>
      </CardContent>

      <CardFooter className="flex space-x-4 p-3 items-center justify-between bg-blue-50 m-6 border border-dashed border-primary rounded-lg">
        <div className="flex space-x-4 items-center">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <div>
            <h2 className="font-bold mb-[2px]">Secure Your Account !</h2>
            <p className="text-sm text-gray-500 font-medium">
              <span>
                Two-factor authentication adds an extra layer of security to
                your account. To log in, in addition you'll need to provide a 6
                digit code
              </span>
            </p>
          </div>
        </div>
        <Button>Enable</Button>
      </CardFooter>
    </Card>
  );
};
