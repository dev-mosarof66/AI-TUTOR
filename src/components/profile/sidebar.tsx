"use client";
import React, { useEffect, useState } from "react";
import {
  MdHome,
  MdEdit,
  MdOutlineLogout,
  MdSubscriptions,
} from "react-icons/md";
import { FaListAlt } from "react-icons/fa";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { Button, Tooltip } from "@mui/material";
import { LuArrowBigUpDash } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppSelector } from "@/app/hooks";

const items = [
  {
    id: 1,
    name: "Home",
    Icon: MdHome,
    link: "/profile",
  },
  {
    id: 2,
    name: "Edit Profile",
    Icon: MdEdit,
    link: "/profile/edit",
  },
  {
    id: 3,
    name: "Enrolled Courses",
    Icon: FaListAlt,
    link: "/profile/enrolled-courses",
  },
  {
    id: 4,
    name: "Subscription",
    Icon: MdSubscriptions,
    link: "/profile/subscriptions",
  },
];

const Sidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const [activeTab, setActiveTab] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const resizeWindow = () => {
      if (window.innerWidth > 768) {
        setToggleSidebar(true);
      }
    };

    window.addEventListener("resize", resizeWindow);
    resizeWindow();

    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);

  return (
    <motion.div
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`${
        toggleSidebar ? "w-64" : "w-fit"
      } h-screen flex flex-col bg-gray-700 text-gray-300`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-gray-500 p-6">
        <div
          onClick={() => setToggleSidebar(!toggleSidebar)}
          className="hidden sm:block lg:hidden rounded-md hover:bg-purple-500/50 transition cursor-pointer duration-300 delay-75"
        >
          {toggleSidebar ? (
            <GoSidebarCollapse size={22} />
          ) : (
            <GoSidebarExpand size={22} />
          )}
        </div>
        <h1
          className={`text-xl font-bold text-purple-500 ${
            toggleSidebar ? "block" : "hidden"
          }`}
        >
          Dashboard
        </h1>
      </div>

      {/* Sidebar Items */}
      <div className="w-full h-[75vh] flex flex-col gap-6 py-6">
        {items.map(({ id, name, Icon, link }) => (
          <div key={id}>
            {!toggleSidebar ? (
              <Button
                variant="text"
                onClick={() => {
                  setActiveTab(id);
                  router.push(link);
                }}
                className={`w-fit flex items-center  px-0 hover:bg-gray-500/20 active:bg-gray-500/30 active:scale-95 cursor-pointer transition duration-300 delay-75`}
              >
                <Tooltip title={name} arrow placement="right">
                  <div
                    className={`w-full flex items-center justify-center py-1 ${
                      id === 4
                        ? "text-amber-400"
                        : `${isDarkMode ? "text-green-500" : "text-blue-800"}`
                    } ${activeTab === id ? "bg-purple-500/30" : ""}
                                `}
                  >
                    <Icon size={id === 3 ? "20" : "24"} />
                  </div>
                </Tooltip>
              </Button>
            ) : (
              <div
                onClick={() => {
                  setActiveTab(id);
                  router.push(link);
                }}
                className={`w-full flex py-2 gap-4 px-6 ${
                  id === 4
                    ? "text-amber-400"
                    : `${isDarkMode ? "text-green-500" : "text-blue-800"}`
                } ${
                  activeTab === id ? "bg-purple-500/30" : ""
                } cursor-pointer transition duration-300 delay-75`}
              >
                <Icon size={id === 3 ? "20" : "24"} />
                <span>{name}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className="w-full flex flex-col items-center justify-center gap-3">
        {!toggleSidebar ? (
          <div className="w-full flex flex-col gap-4">
            <Button className="flex items-center justify-center w-full">
              <LuArrowBigUpDash size={20} className="text-purple-400" />
            </Button>
            {/* Logout icon only */}
            <Button className="flex items-center justify-center w-full cursor-pointer">
              <MdOutlineLogout size={20} className="text-red-400" />
            </Button>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-2">
            <div
              className={`w-[90%] mx-auto flex items-center justify-center py-2  gap-4 border border-purple-400 hover:bg-purple-500/30 active:bg-purple-500/50 active:scale-95 cursor-pointer transition duration-300 delay-75`}
            >
              <LuArrowBigUpDash size={20} className="text-purple-400" />
              <p>Upgrade Plan</p>
            </div>
            <div
              className={`w-[90%] mx-auto flex items-center justify-center py-2  gap-4 border border-purple-400 hover:bg-purple-500/30 active:bg-purple-500/50 active:scale-95 cursor-pointer transition duration-300 delay-75`}
            >
              <MdOutlineLogout size={20} className="text-purple-400" />
              <p>Logout</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;
