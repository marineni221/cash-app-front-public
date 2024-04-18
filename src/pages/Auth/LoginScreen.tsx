/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Logo } from "components/Logo";
import GoogleLogo from "assets/icons/social/google.png";
import { useNavigate } from "react-router";
import { CircleAlert, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { API_URL } from "env/env";
import { LOGIN_PATH } from "api/endpoints";
import { useTranslation } from "react-i18next";
import { Language } from "components/Language";
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";
import bgBlue from "assets/auth/auth-bg.png";
import bgScreenAuth from "assets/misc/auth-screens.png";

export interface LoginValidation {
  email?: string;
  password?: string;
  credentials?: string;
}

export const LoginScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [submitted, setSubmitted] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [emailInputChanged, setEmailInputChanged] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordInputChanged, setPasswordInputChanged] = React.useState(false);
  const [errors, setErrors] = React.useState<LoginValidation>({});
  const [passwordHidden, setPasswordHidden] = React.useState(true);

  useEffect(() => {
    async function checkServerStatus() {
      const response = await fetch(API_URL, {
        method: "GET",
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("response from backend => ", responseData);
      }
    }

    checkServerStatus();
  }, []);

  const validateForm = (): boolean => {
    if (!email.length) {
      setErrors({ email: "Email is required" });
      return false;
    } else if (!password.length) {
      setErrors({ password: "Password is required" });
      return false;
    }

    setErrors({});
    return true;
  };

  useEffect(() => {
    validateForm();
  }, [email, password]);

  const handleEmailInputChange = (email: string) => {
    setEmail(email);
    setEmailInputChanged(true);
  };

  const handlePasswordInputChange = (password: string) => {
    setPassword(password);
    setPasswordInputChanged(true);
  };

  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const formValidated = validateForm();

    if (!formValidated) {
      return;
    }

    try {
      const response = await axios.post(API_URL + LOGIN_PATH, {
        email,
        password,
      });
      const responseData = response.data;
      if (responseData.success) {
        navigate("/auth/otp-verification", {
          state: {
            accountId: responseData.data.accountId,
            phone: responseData.data.phone,
          },
        });
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          setErrors({
            credentials:
              'email or password incorrect, try again or click "Forgot Password" to reset your password',
          });
        } else {
          console.error("Server error: ", error.response);
        }
      }
    }
  };

  return (
    <div
      className="w-full min-h-screen flex items-center lg:p-0 backdrop-blur-lg"
    >
      <div className="mx-auto flex min-h-screen flex-col w-full justify-center lg:justify-between items-center lg:flex-row">
        <div
          className="w-full lg:w-1/2 lg:min-h-screen py-16"
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

        <div className="flex justify-center items-center md:w-1/2 w-full mb-4 lg:mb-0">
          <div
            className={`bg-white py-16 rounded-lg min-[300px]:shadow-lg mt-10`}>
            <form
              action=""
              className="min-[250px]:w-[250px] min-[380px]:w-[400px] min-[530px]:w-[500px] max-[300px]:px-6 px-16"
            > 
              <div className="flex flex-col justify-center">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="font-bold text-xl md:text-2xl">
                    {t("sign-in")}
                  </h1>
                  <h2 className="font-medium mt-1 text-xs md:text-base text-secondary">
                    INENI
                  </h2>
                </div>

                {errors.credentials && (
                  <div className="flex space-x-2 items-center">
                    <CircleAlert className="w-4 h-4 text-red-700" />
                    <span className="text-red-700 text-xs mt-3">
                      {errors.credentials}
                    </span>
                  </div>
                )}

                <div className="mt-12">
                  <label htmlFor="email" className="font-semibold">
                    Email
                  </label>
                  <Input
                    type={"email"}
                    placeholder="Enter your email"
                    onChange={(e) => handleEmailInputChange(e.target.value)}
                    className={`w-full mt-2 outline-0 ${
                      (emailInputChanged && errors.email) ||
                      (submitted && errors.email)
                        ? "mb-2"
                        : "mb-6"
                    } outline-none font-medium w-full border ${
                      (emailInputChanged && errors.email) ||
                      (submitted && errors.email)
                        ? "border-red-500"
                        : "border-border"
                    }`}
                    value={email}
                    id="email"
                  />

                  {errors.email && emailInputChanged && (
                    <span className="text-red-500 text-xs self-start mb-3 pl-1">
                      {errors.email}
                    </span>
                  )}

                  {errors.email && submitted && !emailInputChanged && (
                    <span className="text-red-500 text-xs self-start mb-3 pl-1">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="w-full">
                  <label htmlFor="password" className="block font-semibold">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={passwordHidden ? "password" : "text"}
                      placeholder="Enter your password"
                      onChange={(e) =>
                        handlePasswordInputChange(e.target.value)
                      }
                      className={`w-full mt-2 outline-0 ${
                        (passwordInputChanged && errors.password) ||
                        (submitted && errors.password)
                          ? "border-red-500"
                          : "border-border"
                      }`}
                      value={password}
                      id="password"
                    />
                    <div className="absolute right-2 top-[50%] translate-y-[-50%]">
                      {passwordHidden ? (
                        <Eye
                          className="text-secondary w-5 h-5 cursor-pointer"
                          onClick={() => setPasswordHidden(false)}
                        />
                      ) : (
                        <EyeOff
                          className="text-secondary w-5 h-5 cursor-pointer"
                          onClick={() => setPasswordHidden(true)}
                        />
                      )}
                    </div>
                  </div>

                  {errors.password && passwordInputChanged && (
                    <span className="text-red-500 self-start pl-1 mt-2 text-xs">
                      {errors.password}
                    </span>
                  )}

                  {errors.password && submitted && !passwordInputChanged && (
                    <span className="text-red-500 self-start pl-1 mt-2 text-xs">
                      {errors.password}
                    </span>
                  )}
                </div>

                <div className="w-full flex justify-end mt-3">
                  <button
                    className={`underline text-primary hover:opacity-80 text-xs md:text-sm`}
                    onClick={() => navigate("/auth/password-forgotten")}
                  >
                    {t("forgot-password") + " ?"}
                  </button>
                </div>

                <Button className="w-full mt-6" onClick={onSubmit}>
                  {t("sign-in")}
                </Button>

                <div className="flex items-center w-full mt-6">
                  <div className={`w-1/2 h-[1px] bg-border opacity-80`}></div>
                  <span className={`mx-2 text-sm text-secondary`}>
                    {t("or")}
                  </span>
                  <div className={`w-1/2 h-[1px] bg-border opacity-80`}></div>
                </div>

                <button className="w-[250px] self-center border border-gray-200 px-4 py-2 transition-all duration-300 flex items-center justify-center space-x-1 rounded-md mt-4 hover:bg-slate-100">
                  <div className="flex items-center space-x-4">
                    <img src={GoogleLogo} className="w-4 h-4" alt="" />
                    <span className={`text-secondary text-xs md:text-sm`}>
                      {t("google-sign")}
                    </span>
                  </div>
                </button>
              </div>
            </form>

            <Language />
          </div>
        </div>
      </div>
    </div>
  );
};
