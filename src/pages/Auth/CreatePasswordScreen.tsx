import { Button } from "components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { Input } from "components/ui/input";
import React, { useEffect, useState } from "react";
import authBg from "assets/auth/bg5.jpg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "api/axios";
import { CHECK_EMAIL_TOKEN, CREATE_PASSWORD_PATH } from "api/endpoints";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "components/ui/alert-dialog";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Check, Eye, EyeOff, LoaderCircle, X } from "lucide-react";
import { useLocation } from "react-router";
import { PasswordValidation, validatePassword } from "helpers/helpers";
import { useTranslation } from "react-i18next";

interface ValidationError {
  password: PasswordValidation;
  passwordConfirmation?: string;
}

const CreatePasswordScreen = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [passwordComplexity, setPasswordComplexity] = useState({
    weak: false,
    medium: false,
    strong: false,
  });
  const [passwordValidated, setPasswordValidated] = useState(false);
  const [passwordHidden1, setPasswordHidden1] = useState(true);
  const [passwordHidden2, setPasswordHidden2] = useState(true);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  const [error, setError] = useState<ValidationError>({
    password: {
      size: false,
      digits: false,
      lower: false,
      upper: false,
      specialChar: false,
    },
    passwordConfirmation: "",
  });

  useEffect(() => {
    const checkEmailToken = async () => {
      setIsLoading(true);
      try {
        await axios.post(CHECK_EMAIL_TOKEN, { token });
      } catch (error: any) {
        console.log(error);
        if (
          error?.response?.status === 404 ||
          error?.response?.status === 422
        ) {
          setShowModal(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkEmailToken();
  }, [token]);

  useEffect(() => {
    const passwordValidated = validatePassword(password);
    setPasswordValidated(
      !Object.values(passwordValidated).some((value) => value === false)
    );
    setError((prevState) => {
      return {
        ...prevState,
        password: passwordValidated,
        passwordConfirmation: "",
      };
    });

    checkPasswordComplexity(passwordValidated);
  }, [password]);

  const checkPasswordComplexity = (passwordValidated: PasswordValidation) => {
    if (passwordValidated.lower && passwordValidated.upper) {
      setPasswordComplexity((prevState) => {
        return { ...prevState, weak: true };
      });
    } else {
      setPasswordComplexity({ weak: false, medium: false, strong: false });
    }

    if (
      passwordValidated.digits &&
      password.length >= 5 &&
      passwordValidated.lower && passwordValidated.upper
    ) {
      setPasswordComplexity((prevState) => {
        return { ...prevState, medium: true };
      });
    } else {
      setPasswordComplexity((prevState) => {
        return { ...prevState, medium: false };
      });
    }

    if (
      passwordValidated.lower && passwordValidated.upper &&
      passwordValidated.digits &&
      passwordValidated.specialChar &&
      password.length >= 8
    ) {
      setPasswordComplexity((prevState) => {
        return { ...prevState, strong: true };
      });
    } else {
      setPasswordComplexity((prevState) => {
        return { ...prevState, strong: false };
      });
    }
  };

  const validatePasswordConfirmation = () => {
    if (!passwordConfirmation.length) {
      setError((prevState) => {
        return { ...prevState, passwordConfirmation: "confirm-password" };
      });
      return false;
    } else if (passwordConfirmation !== password) {
      setError((prevState) => {
        return {
          ...prevState,
          passwordConfirmation:
            "identic-password-validation",
        };
      });
      return false;
    }
    return true;
  };

  const createNewPassword = async () => {
    if (!validatePasswordConfirmation()) {
      return;
    }

    try {
      const axiosResponse = await axios.post(CREATE_PASSWORD_PATH, {
        password,
        password_confirmation: passwordConfirmation,
        token,
      });
      if (axiosResponse.status === 200) {
        console.log(axiosResponse);
        setShowModal2(true);
      }
    } catch (error) {
      console.error("error creating new password => ", error);
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
      <AlertDialog open={showModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('page-expired')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('login-again')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() =>
                navigate("/auth/login", { state: { from: location }, replace: true })
              }
            >
              {t('return-login')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showModal2}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('password-reseted')}</AlertDialogTitle>
            <AlertDialogDescription>
            {t('password-reseted-description')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() =>
                navigate("/auth/login", { state: { from: location }, replace: true })
              }
            >
              {t('return-login')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {isLoading && (
        <div className="backdrop-blur-3xl absolute w-full h-screen px-10 flex justify-center items-center  ">
          <LoaderCircle className="animate-spin text-white w-20 h-20" />
        </div>
      )}

      {!isLoading && !showModal && (
        <div className="backdrop-blur-3xl absolute w-full h-screen px-10 flex justify-center items-center  ">
          <Card className="w-[600px]">
            <CardHeader>
              <CardTitle>{t("create-new-password")}</CardTitle>
            </CardHeader>

            <CardDescription className="px-6 mb-6">
              {t("create-new-password-description")}
            </CardDescription>

            <CardContent>
              <Tooltip.Provider>
                <Tooltip.Root open={isFocused1}>
                  <Tooltip.Trigger className="w-full pt-2 relative">
                    <Input
                      type={passwordHidden1 ? "password" : "text"}
                      placeholder="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full outline-0"
                      value={password}
                      onFocus={() => setIsFocused1(true)}
                      onBlur={() => setIsFocused1(false)}
                    />
                    <div className="absolute right-2 top-[50%] translate-y-[-35%]">
                      {passwordHidden1 ? (
                        <Eye
                          className="text-secondary w-5 h-5 cursor-pointer"
                          onClick={() => setPasswordHidden1(false)}
                        />
                      ) : (
                        <EyeOff
                          className="text-secondary w-5 h-5 cursor-pointer"
                          onClick={() => setPasswordHidden1(true)}
                        />
                      )}
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Content>
                    <Card className="shadow-xl">
                      <CardHeader className="font-semibold pb-4">
                        {t("password-complexity-requirements")}
                      </CardHeader>
                      <div className="w-full h-2  flex space-x-1 px-6 mb-4">
                        <div
                          className={`rounded-lg flex-1 h-full ${
                            passwordComplexity.weak && password.length
                              ? "bg-red-500"
                              : "bg-slate-100"
                          }`}
                        ></div>
                        <div
                          className={`rounded-lg flex-1 h-full ${
                            passwordComplexity.medium && password.length
                              ? "bg-yellow-500"
                              : "bg-slate-100"
                          }`}
                        ></div>
                        <div
                          className={`rounded-lg flex-1 h-full ${
                            passwordComplexity.strong && password.length
                              ? "bg-green-500"
                              : "bg-slate-100"
                          }`}
                        ></div>
                      </div>
                      <CardDescription className="pl-6 pb-4">
                        {t("password-complexity-description")}
                      </CardDescription>
                      <CardContent>
                        <PasswordValidationItem
                          checked={error.password.size}
                          description={t("password-complexity-length")}
                        />
                        <PasswordValidationItem
                          checked={error.password.digits}
                          description={t("password-complexity-digits")}
                        />
                        <PasswordValidationItem
                          checked={error.password.upper}
                          description={t("password-complexity-upper")}
                        />
                        <PasswordValidationItem
                          checked={error.password.lower}
                          description={t("password-complexity-lower")}
                        />
                        <PasswordValidationItem
                          checked={error.password.specialChar}
                          description={t("password-complexity-specialChar")}
                        />
                      </CardContent>
                    </Card>
                  </Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>

              <div className="h-4"></div>

              <div className="relative">
                <Input
                  type={passwordHidden2 ? "password" : "text"}
                  placeholder="confirm password"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className="outline-0"
                  value={passwordConfirmation}
                />
                <div className="absolute right-2 top-[50%] translate-y-[-50%]">
                  {passwordHidden2 ? (
                    <Eye
                      className="text-secondary w-5 h-5 cursor-pointer"
                      onClick={() => setPasswordHidden2(false)}
                    />
                  ) : (
                    <EyeOff
                      className="text-secondary w-5 h-5 cursor-pointer"
                      onClick={() => setPasswordHidden2(true)}
                    />
                  )}
                </div>
              </div>

              {error.passwordConfirmation && (
                <span className="block text-sm text-red-500 mt-2 ml-1">
                  {t(error.passwordConfirmation)}
                </span>
              )}
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button onClick={createNewPassword} disabled={!passwordValidated}>
                {t('create-password')}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

interface PasswordValidationItemProps {
  checked: boolean;
  description: string;
}

const PasswordValidationItem = ({
  checked,
  description,
}: PasswordValidationItemProps) => {
  return (
    <div className="flex space-x-2 items-center py-1">
      {checked ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <X className="w-4 h-4 text-red-500" />
      )}

      <span className="text-sm">{description}</span>
    </div>
  );
};

export default CreatePasswordScreen;
