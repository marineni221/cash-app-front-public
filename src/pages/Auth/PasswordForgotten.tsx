import { Button } from "components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import React from "react";
import authBg from "assets/auth/bg3.jpg";
import { Input } from "components/ui/input";
import { useNavigate } from "react-router";
import axios from "api/axios";
import { SEND_LINK_EMAIL_PATH } from "api/endpoints";
import { FRONT_URL } from "env/env";
import { CircleCheck, Mail } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";
import verifyEmailImage from "assets/auth/please-verify-your-email.png";

const PasswordForgotten = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [emailVerified, setEmailVerified] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [emailInputChanged, setEmailInputChanged] = React.useState(false);

  React.useEffect(() => {
    if (!email.length) {
      setError("email-required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("email-not-valid");
    } else {
      setError("");
    }
  }, [email]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    setEmailInputChanged(true);
  };

  const sendLinkToEmail = async () => {
    try {
      const axiosResponse = await axios.post(SEND_LINK_EMAIL_PATH, {
        email,
        create_password_link: `${FRONT_URL}/auth/create-password`,
      });
      const response = axiosResponse.data;
      if (response.success) {
        setEmailVerified(true);
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response?.status === 404) {
        setError("email-not-correspond-to-user");
      }
    }
  };

  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: `url(${authBg})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {emailVerified && (
        <div className="backdrop-blur-3xl absolute w-full h-screen px-10 py-4 flex justify-center items-center">
          <Card className="w-[600px] shadow-xl">
            <CardHeader className=" flex items-center">
              <CircleCheck className="w-8 h-8 mb-2" color="#84cc16" />
              <span className="text-center font-semibold text-lg">
                {t("check-email")}
              </span>
            </CardHeader>
            <CardDescription className="flex flex-col items-center justify-center">
              <Trans
                i18nKey={"link-sent-to-email"}
                values={{ email }}
                components={{ 1: <span></span> }}
              />
            </CardDescription>
            <CardContent className="flex items-center justify-center flex-col mt-4">
              <div className="w-48 h-48">
                <img
                  src={verifyEmailImage}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!emailVerified && (
        <div className="backdrop-blur-3xl absolute w-full h-screen px-10 flex justify-center items-center  ">
          <Card className="w-[600px] shadow-xl">
            <CardHeader>
              <CardTitle>{t("retrieve-account")}</CardTitle>
            </CardHeader>

            <CardDescription className="px-6 mb-6">
              {t("enter-email-address")}
            </CardDescription>

            <CardContent className="relative pl-6">
              <Mail className="text-muted-foreground w-5 h-5 absolute top-3 left-0"/>
              <Input
                type="email"
                placeholder="Email"
                onChange={onInputChange}
                className="outline-0 pl-10"
                value={email}
              />
              {!!error.length && emailInputChanged && (
                <span className="block text-sm text-red-500 mt-2 ml-1">
                  {t(error)}
                </span>
              )}
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button onClick={() => navigate("/auth/login")} variant="outline">
                {t("return-login")}
              </Button>
              <Button onClick={sendLinkToEmail} disabled={!!error.length}>
                {t("next")}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PasswordForgotten;
