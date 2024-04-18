import { ROLES_PATH } from "api/endpoints";
import React, { useState } from "react";
import { useAuth } from "hooks/useAuth";
import { useApi } from "hooks/useApi";
import { ToastAction } from "components/ui/toast";
import { useToast } from "components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
} from "components/ui/alert-dialog";
import { useLocation, useNavigate } from "react-router";
import { Card, CardContent } from "components/ui/card";
import SessionExpiresImage from "assets/auth/session-expired.png";

const HomeScreen = () => {
  const { token } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);
  // const [roles, setRoles] = useState([]);

  const { get } = useApi();

  React.useEffect(() => {
    const getRoles = async () => {
      try {
        const response = await get(ROLES_PATH);
        const responseData = response?.data;
        console.log("success responseData in get roles", responseData);
        if (showModal) {
          setShowModal(false);
        }
        // navigate("/auth/login", { state: location, replace: true });
        // setRoles(responseData.data);
      } catch (error: any) {
        console.log("error response in getRoles => ", error.response);
        if (error?.response?.status === 401) {
          setShowModal(true);
        } else if (error?.response?.status === 500) {
          console.error("Server error: ", error.response);
        }
      }
    };

    getRoles();
  }, [token]);

  // const testToken = async () => {
  //   try {
  //     const response = await axios.get("/token", {
  //       headers: { Authorization: "Bearer " + token },
  //     });
  //     console.log("response => ", response.data);
  //   } catch (error: any) {
  //     console.log("error response in getRoles => ", error.response);
  //   }
  // };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <button
        className="bg-primary px-4 py-1 rounded-lg text-white"
        onClick={() => {
          console.log("click");

          toast({
            title: "Scheduled: Catch up ",
            description: "Friday, February 10, 2023 at 5:57 PM",
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
          });
        }}
      >
        Toast
      </button>

      <AlertDialog open={showModal}>
        <AlertDialogContent>
          <Card className="shadow-none border-none">
            <CardContent>
              <div className="flex flex-col items-center justify-center">
                <img
                  src={SessionExpiresImage}
                  className="w-20 h-20 my-6"
                  alt="session expires"
                />
                <h1 className="text-2xl font-semibold leading-none tracking-tight py-6 text-center">
                  Your session has expired
                </h1>
                <h2 className="text-base font-medium text-muted-foreground text-center">
                  Please login again to continue your activites. Don't worry we
                  kept all of data in place.
                </h2>
              </div>
            </CardContent>
          </Card>
          <AlertDialogFooter>
            <div className="flex items-center justify-center w-full">
              <AlertDialogAction
                onClick={() =>
                  navigate("/auth/login", {
                    state: { from: location },
                    replace: true,
                  })
                }
              >
                Go to Login
              </AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default HomeScreen;
