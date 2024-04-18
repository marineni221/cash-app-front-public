import React, { useState } from "react";
import { Button } from "./ui/button";
import { BellRing, LogOut, Monitor, Moon, SunMoon, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import userAvatar from "assets/avatars/300-1.jpg";
import { createPortal } from "react-dom";
import { RotatingLines } from "react-loader-spinner";
import { COLORS } from "utils/ui";
import { useLogout } from "hooks/useLogout";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Modal } from "./Modal";
import { CreateCampaign } from "../pages/CreateCampaign/CreateCampaign";

function NavBar() {
  const { isLoading, logout } = useLogout();
  const [showModalConfirmation, setShowModalConfirmation] =
    React.useState(false);
  const [showCreateCampaignModal, setShowCreateCampaignModal] = useState(false);

  return (
    <div className="w-full h-[70px] bg-white shadow-sm flex items-center justify-end px-4 py-5 space-x-6 pr-10">
      <Button
        className="rounded-3xl shadow-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-purple-500"
        onClick={() => setShowCreateCampaignModal(true)}
      >
        Create campaigns
      </Button>
      <div className="relative">
        <BellRing className="text-gray-600 w-5 h-5" />
        <div className="w-4 h-4 bg-red-600 rounded-full grid place-items-center absolute -top-2 -right-1 text-xs text-white">
          5
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <SunMoon className="text-gray-600 w-5 h-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className="flex items-center space-x-3">
              <SunMoon className="w-4 h-4 text-gray-600" />
              <span>Light</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex items-center space-x-3">
              <Moon className="w-4 h-4 text-gray-600" />
              <span>Dark</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex items-center space-x-3">
              <Monitor className="w-4 h-4 text-gray-600" />
              <span>Système</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={userAvatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className="flex items-center space-x-3">
              <User className="w-4 h-4 text-gray-600" />
              <span>Profile</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              onClick={() => setShowModalConfirmation(true)}
              className="flex items-center space-x-3"
            >
              <LogOut className="w-4 h-4 text-gray-600" />
              <span>Logout</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showModalConfirmation && (
        <div className="flex">
          {createPortal(
            <div className="fixed z-50 inset-0 grid place-items-center bg-[rgba(0,0,0,0.5)]">
              <Card>
                <CardHeader className="font-semibold text-lg">
                  Logout
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  You're about to disconnect, are you sure you want to continue
                  ?
                </CardContent>
                <CardFooter className="flex space-x-4 justify-end">
                  <Button
                    onClick={() => setShowModalConfirmation(false)}
                    className="bg-red-400 hover:bg-red-300"
                  >
                    cancel
                  </Button>
                  <Button onClick={logout}>confirm</Button>
                </CardFooter>
              </Card>
            </div>,
            document.body
          )}
        </div>
      )}

      {isLoading && (
        <div className="flex">
          {createPortal(
            <div className="absolute inset-0 grid place-items-center bg-[rgba(0,0,0,0.5)]">
              <RotatingLines
                visible={true}
                width="96"
                strokeWidth="5"
                strokeColor={COLORS.primary}
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
              />
            </div>,
            document.body
          )}
        </div>
      )}

      {createPortal(
        <Modal
          open={showCreateCampaignModal}
          onClose={() => setShowCreateCampaignModal(false)}
        >
          <CreateCampaign onClose={() => setShowCreateCampaignModal(false)} />
        </Modal>,
        document.body
      )}
    </div>
  );
}

export default NavBar;
