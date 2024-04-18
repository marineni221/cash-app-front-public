import React from "react";
import bg from "assets/auth/bg1.jpg";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "components/ui/card";
import Image404 from "assets/auth/404-error.png";
import { Button } from "components/ui/button";
import { useNavigate } from "react-router";

const ErrorScreen = () => {
    const navigate = useNavigate();

  return (
    <div
      className="w-full h-screen flex justify-center items-center font-poppins"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
        <Card className="flex flex-col items-center w-[550px]">
            <CardHeader className="text-3xl font-semibold">Oops !</CardHeader>
            <CardDescription className="text-sm">It seems something went wrong</CardDescription>
            <CardContent>
                <img src={Image404} className="w-[300px]" alt="Page not found" />
            </CardContent>
            <CardFooter className="flex flex-col space-y-6">
                <span>Page not found</span>
                <Button onClick={() => navigate('/auth/login')}>Return Home</Button>
            </CardFooter>
        </Card>
    </div>
  );
};

export default ErrorScreen;
