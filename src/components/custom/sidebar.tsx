"use client";
import React, { useEffect, useState } from "react";
import { Button, Tooltip } from "@mui/material";
import "../../css/sidebar.css";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { LuLogIn, LuArrowBigUpDash } from "react-icons/lu";

interface SidebarProps {
  title?: string;
  items: { id: number; name: string; Icon: React.ElementType }[];
  isDarkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  title = "Neura",
  items,
  isDarkMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileScreen, setMobileScreen] = useState(false);
  const user = false;

  useEffect(() => {
    const resizeWindow = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
        setMobileScreen(true);
      }
    };

    window.addEventListener("resize", resizeWindow);
    resizeWindow();

    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);
  return (
    <div
      className={`${isOpen ? "w-60 sm:w-72 md:w-96" : "w-fit"} ${
        isMobileScreen ? "absolute z-50" : ""
      } h-screen  border-r ${
        isDarkMode
          ? "bg-gray-700 text-gray-300 border-r-white/50"
          : "bg-white  text-gray-600 border-r-gray-400/50"
      } transition-all   backdrop-blur-2xl`}
    >
      <div className="h-screen py-6 transition-all duration-200 delay-75">
        {/* header  */}
        <div className="w-full flex items-center justify-between px-2">
          <h1
            className={`text-xl sm:text-2xl font-semibold text-green-500 ${
              isOpen ? "block" : "hidden"
            } transition-transform duration-300 delay-75 pl-3`}
          >
            {title}
          </h1>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 pl-4 hover:bg-gray-500/20 active:bg-gray-500/20 rounded-full active:ring-1 ring-purple-500 cursor-pointer transition duration-300 delay-75 group"
          >
            {isOpen ? (
              <Tooltip title="collapse" arrow placement="right">
                <GoSidebarCollapse
                  size={19}
                  className={`${
                    isDarkMode
                      ? "text-gray-300 group-active:text-gray-500"
                      : "text-gray-600 group-active:text-gray-500"
                  } transform duration-300 delay-75`}
                />
              </Tooltip>
            ) : (
              <Tooltip title="expand" arrow placement="right">
                <GoSidebarExpand
                  size={19}
                  className={`${
                    isDarkMode
                      ? "text-gray-300 group-active:text-gray-500"
                      : "text-gray-600 group-active:text-gray-500"
                  } transform duration-300 delay-75`}
                />
              </Tooltip>
            )}
          </div>
        </div>
        <div className="w-full h-[1px] my-4 bg-gray-600/30"></div>

        {/* sidebar items goes here  */}
        <div className="h-[70vh] xs:h-[75vh]  sm:h-[75vh] overflow-y-scroll scrollbar-hidden">
          <div
            className={`w-full flex flex-col items-center ${
              isOpen ? "gap-3" : "gap-5"
            }`}
          >
            {items.map((Item, index) => (
              <>
                {!isOpen ? (
                  <Button
                    variant="text"
                    key={index}
                    className={`w-fit flex items-center gap-2 my-2 py-2 px-0 hover:bg-gray-500/20 active:bg-gray-500/30 active:scale-95 cursor-pointer transition duration-300 delay-75`}
                  >
                    <Tooltip title={Item.name} arrow placement="right">
                      <div
                        className={`${
                          Item.id === 4
                            ? "text-amber-400"
                            : `${
                                isDarkMode ? "text-green-500" : "text-blue-800"
                              }`
                        }`}
                      >
                        <Item.Icon />
                      </div>
                    </Tooltip>
                  </Button>
                ) : (
                  <div
                    key={index}
                    className={`w-full flex items-center gap-2 py-2 px-4 hover:bg-gray-500/20 active:bg-gray-500/30 active:scale-95 cursor-pointer transition duration-300 delay-75`}
                  >
                    <div
                      className={`${
                        Item.id === 4
                          ? "text-amber-400"
                          : `${isDarkMode ? "text-green-500" : "text-blue-800"}`
                      }`}
                    >
                      <Item.Icon />
                    </div>
                    <p>{Item.name}</p>
                  </div>
                )}
              </>
            ))}
          </div>
          <div className="w-full h-[1px] my-4 bg-gray-600/50"></div>
          <Button variant="text">HI</Button>
        </div>

        {/* profile or login  */}
        <div className="w-full flex flex-col items-center justify-center gap-3">
          <div className="w-full flex items-center justify-center">
            <Button
              component="label"
              className={`${isOpen ? "w-[80%]" : "px-2"}`}
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<LuArrowBigUpDash />}
            >
              <p className={`${isOpen ? "block" : "hidden"}`}>UPGRADE</p>
            </Button>
          </div>
          <div className="w-full flex items-center justify-center">
            {user ? (
              <div></div>
            ) : (
              <Button
                component="label"
                className={`${isOpen ? "w-[80%]" : "px-2"}`}
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<LuLogIn />}
              >
                <p className={`${isOpen ? "block" : "hidden"}`}> Join Now</p>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
