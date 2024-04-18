import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "components/ui/input-otp";
import { Button } from "components/ui/button";
import { useNavigate } from "react-router";
import { RotateCw } from "lucide-react";
import { useToast } from "components/ui/use-toast";
import { OTP_RESEND_PATH, OTP_VERIFICATION_PATH } from "api/endpoints";
import { useAuth } from "hooks/useAuth";
import { axiosInterceptor } from "api/axios";
import { Logo } from "components/Logo";
import bgBlue from "assets/auth/auth-bg.png";
import bgScreenAuth from "assets/misc/auth-screens.png";
import { useTranslation } from "react-i18next";
import phoneImg from "assets/auth/phone.png";
import { Language } from "components/Language";

const OtpCodeScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setToken } = useAuth();
  const { t } = useTranslation();

  // const { accountId, phone } = state.state;
  const { accountId, phone } = { phone: "783899860", accountId: 1 };

  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);

  const handleInputChange = (value: string) => {
    setCode(value);
    if (value.length < 6 && !disabled) {
      setDisabled(true);
      setError("");
    }
  };

  const handleInputCompleted = (code: string) => {
    setDisabled(false);
    setCode(code);
    handleSubmit(code);
  };

  const resendCode = async () => {
    toast({
      title: "Code renvoyé",
      description: `Nous avons renvoyer un nouveau code au *******${phone.slice(
        phone.length - 2
      )}.`,
    });
    try {
      const response = await axiosInterceptor.post(OTP_RESEND_PATH, {
        account_id: accountId,
      });
      const responseData = response.data;
      if (responseData.success) {
        toast({
          title: "Code renvoyé",
          description: `Nous avons renvoyer un nouveau code au *******${phone.slice(
            phone.length - 2
          )}.`,
        });
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 422) {
          setError("Invalid code try again");
        } else {
          console.error("Server error: ", error.response);
        }
      }
    }
  };

  const handleSubmit = async (code?: string) => {
    try {
      setIsLoading(true);
      const response = await axiosInterceptor.post(OTP_VERIFICATION_PATH, {
        account_id: accountId,
        code,
      });

      const responseData = response.data;
      console.log("responseData on otp code screen => ", responseData);

      if (responseData.success) {
        setToken(responseData.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.log("error => ", error);
      if (error.response) {
        if (error.response.status === 422) {
          setError("Invalid code try again");
        } else {
          console.error("Server error: ", error.response);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center lg:p-0 backdrop-blur-lg">
      <div className="mx-auto flex flex-col w-full justify-center lg:justify-between items-center lg:flex-row">
        <div
          className="w-full lg:w-1/2 lg:h-screen py-16"
          style={{
            backgroundImage: `url(${bgBlue})`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center py-16 px-5 md:px-16">
            {/* Cash App Logo */}
            <div className="mx-auto my-8">
              <Logo />
            </div>

            {/* Auth Screen Image */}
            <img src={bgScreenAuth} className="w-[500px]" alt="" />

            <div className="rounded-lg flex flex-col items-center justify-center mt-10">
              <h1 className="text-3xl text-white text-center font-bold mt-6">
                Fast, Efficient and Productive
              </h1>
              <div className="min-[400px]:w-[380px] flex flex-col justify-center items-center md:items-start">
                <h2 className="text-gray-200 mt-2 md:mt-4 text-xs md:text-base font-medium text-center">
                  {t("description")}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="flex p-6 flex-col justify-center items-center md:w-1/2 md:h-screen w-full mb-4 lg:mb-0">
          <div className="flex-1 flex flex-col justify-center items-center">
            <img src={phoneImg} className="w-28" alt="Phone" />

            <h1 className="font-semibold text-lg mt-6">
              Two Step Verification
            </h1>

            <p className="text-muted-foreground text-base my-4">
              Enter the code we have sent to
            </p>

            <p className="font-medium">
              {phone.slice(phone.length - 2).padStart(9, "*")}
            </p>

            <div className="mt-8">
              <span className="text-xs font-medium block mb-2">
                Type your 6 digit security code
              </span>
              <InputOTP
                maxLength={6}
                onComplete={handleInputCompleted}
                onChange={handleInputChange}
              >
                <InputOTPGroup>
                  <InputOTPSlot
                    className={error.length ? "border-red-500" : ""}
                    index={0}
                  />
                  <InputOTPSlot
                    className={error.length ? "border-red-500" : ""}
                    index={1}
                  />
                  <InputOTPSlot
                    className={error.length ? "border-red-500" : ""}
                    index={2}
                  />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot
                    className={error.length ? "border-red-500" : ""}
                    index={3}
                  />
                  <InputOTPSlot
                    className={error.length ? "border-red-500" : ""}
                    index={4}
                  />
                  <InputOTPSlot
                    className={error.length ? "border-red-500" : ""}
                    index={5}
                  />
                </InputOTPGroup>
              </InputOTP>

              {!!error.length && (
                <span className="block text-center text-red-500 text-sm mt-4">
                  {error}
                </span>
              )}
            </div>

            <div className="mt-6">
              <Button
                disabled={disabled || isLoading}
                onClick={() => handleSubmit(code)}
              >
                {isLoading && (
                  <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </div>

            <div className="flex items-center mt-6 space-x-2">
              <span className="text-muted-foreground text-sm">
                Didn't get the code ?
              </span>
              <button
                onClick={resendCode}
                className="text-primary text-sm hover:opacity-80"
              >
                Resend
              </button>
            </div>
          </div>

          <div>
            <Language />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpCodeScreen;
