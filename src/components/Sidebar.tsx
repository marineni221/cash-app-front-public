import {
  ArrowLeftToLine,
  ChevronDown,
  CircleHelp,
  Dot,
  LayoutDashboard,
  MessageCircle,
  Settings,
  Tent,
  User,
  UserCog,
} from "lucide-react";
import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import CashAppLogo from "assets/logos/cashapp2.svg";

function Sidebar() {
  const [opened, setOpened] = useState(true);
  const { pathname } = useLocation();

  return (
    <aside
      className={`shadow-lg ${
        opened ? "w-[250px]" : "w-[80px]"
      } min-h-full pt-6 bg-white duration-300 relative`}
    >
      <button
        onClick={() => setOpened(!opened)}
        className="w-6 h-6 rounded-full grid place-items-center absolute -right-3 top-1/2 translate-y-[-50%] bg-primary border border-gray-300 cursor-pointer hover:opacity-80"
      >
        <ArrowLeftToLine
          className={`w-3 h-3 text-white duration-300 ${
            !opened && "rotate-180"
          }`}
        />
      </button>

      <Link to={"/"} className="flex">
        <div className="w-[80px] h-[40px] grid place-items-center">
          <div className="w-[35px] h-[35px] rounded-full">
            <img
              src={CashAppLogo}
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
        <div
          className={`font-semibold text-lg md:text-xl text-primary font-poppins overflow-hidden duration-300 flex justify-start items-center ${
            opened ? "w-[170px]" : "w-0"
          } ${opened ? "scale-100" : "scale-0"}`}
        >
          Cash App
        </div>
      </Link>

      <nav className="mt-8">
        <SidebarNavItem
          to="dashboard"
          icon={
            <LayoutDashboard
              className={`${
                pathname === "/dashboard" ? "text-primary" : "text-gray-600"
              } w-5 h-6`}
            />
          }
          title="Dashboard"
          opened={opened}
        />

        <SidebarNavItem
          to="campaigns"
          icon={
            <Tent
              className={`${
                pathname === "/campaigns" ? "text-primary" : "text-gray-600"
              } w-5 h-6`}
            />
          }
          title="Campaigns"
          opened={opened}
        />

        <SidebarNavItem
          to="accounts"
          icon={
            <User
              className={`${
                pathname === "/accounts" ? "text-primary" : "text-gray-600"
              } w-5 h-6`}
            />
          }
          title="Accounts"
          opened={opened}
          subMenu={[
            { to: "overview", title: "Overview" },
            { to: "settings", title: "Settings" },
            { to: "logs", title: "Logs" },
          ]}
        />

        <div className="w-[90%] h-[1px] bg-muted-foreground opacity-10 mx-auto my-4"></div>

        <SidebarNavItem
          to="chats"
          icon={
            <MessageCircle
              className={`${
                pathname === "/chats" ? "text-primary" : "text-gray-600"
              } w-5 h-6`}
            />
          }
          title="Chats"
          opened={opened}
        />

        <SidebarNavItem
          to="employee-management"
          icon={
            <UserCog
              className={`${
                pathname === "/employee-management" ? "text-primary" : "text-gray-600"
              } w-5 h-6`}
            />
          }
          title="Employee Management"
          opened={opened}
        />

        <div className="w-[90%] h-[1px] bg-muted-foreground opacity-10 mx-auto my-4"></div>

        <SidebarNavItem
          to="settings"
          icon={
            <Settings
              className={`${
                pathname === "/settings" ? "text-primary" : "text-gray-600"
              } w-5 h-6`}
            />
          }
          title="Settings"
          opened={opened}
        />

        <SidebarNavItem
          to="help"
          icon={
            <CircleHelp
              className={`${
                pathname === "/help" ? "text-primary" : "text-gray-600"
              } w-5 h-6`}
            />
          }
          title="Help"
          opened={opened}
        />
      </nav>
    </aside>
  );
}

export const SidebarNavItem = ({
  to,
  icon,
  title,
  opened,
  subMenu,
}: {
  icon: React.ReactNode;
  title: string;
  opened: boolean;
  to: string;
  subMenu?: Array<any>;
}) => {
  const [subMenuOpened, setSubMenuOpened] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState("");
  const { pathname } = useLocation();

  const handleClick = () => {
    if (pathname === `/${to}`) {
      setSubMenuOpened(!subMenuOpened);
    }
  };

  return (
    <div>
      <NavLink
        onClick={handleClick}
        to={`/${to}`}
        className={({ isActive }) =>
          isActive
            ? "mb-1 flex bg-blue-50 mx-2 h-[40px] rounded-lg cursor-pointer transition-color duration-200"
            : "mb-1 flex hover:bg-slate-100 mx-2 h-[40px] rounded-lg cursor-pointer transition-color duration-200"
        }
      >
        <div className={`w-[80px] flex items-center justify-center h-full`}>
          {icon}
        </div>

        <NavLink
          to={`/${to}`}
          className={({ isActive }) =>
            isActive
              ? `font-semibold text-primary duration-300 h-full overflow-hidden ${
                  opened ? "w-[170px]" : "scale-0 w-0"
                }`
              : `font-semibold text-gray-800 duration-300 h-full overflow-hidden ${
                  opened ? "w-[170px]" : "scale-0 w-0"
                }`
          }
        >
          <div className="flex justify-between items-center h-full">
            <span>{title}</span>
            {subMenu && (
              <ChevronDown
                className={`w-5 h-5 mr-2 duration-100 ${
                  subMenuOpened && "rotate-180"
                }`}
              />
            )}
          </div>
        </NavLink>
      </NavLink>

      <ul
        className={`overflow-hidden transition-all duration-300`}
        style={{
          height:
            !subMenuOpened || (subMenuOpened && !opened) ? 0 : "fit-content",
        }}
      >
        {subMenu?.map((menu) => (
          <Link
            onClick={() => setActiveSubMenu(menu.to)}
            to={`/${to}`}
            state={{ active: menu.to }}
            key={menu.title}
            className={`flex cursor-pointer mx-2  hover:bg-blue-50 rounded-lg`}
          >
            <div className="w-[80px] flex items-center justify-center h-[40px]"></div>
            <span
              className={`w-full flex items-center ${
                activeSubMenu === menu.to && "text-primary"
              } text-gray-500`}
            >
              <Dot />
              {menu.title}
            </span>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
