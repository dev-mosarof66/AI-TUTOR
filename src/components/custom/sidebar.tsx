"use client";
import React, { useEffect, useState } from "react";
import { Button, Tooltip } from "@mui/material";
import "../../css/sidebar.css";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { LuLogIn, LuArrowBigUpDash } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/hooks";
import { MdOutlineLogout } from "react-icons/md";

interface SidebarItem {
  id: number;
  name: string;
  Icon: React.ElementType;
  link: string;
}

interface SidebarProps {
  title?: string;
  items: SidebarItem[];
  isDarkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  title = "Neura",
  items,
  isDarkMode,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(1);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    const resizeWindow = () => {
      if (window.innerWidth > 768) {
        setIsOpen(true);
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
      className={`hidden md:block ${
        isOpen ? "w-64 lg:w-72 xl:w-96" : "w-fit"
      } h-screen  border-r ${
        isDarkMode
          ? "bg-gray-700 text-gray-300 border-r-white/50"
          : "bg-white  text-gray-600 border-r-gray-400/50"
      } transition-all   backdrop-blur-2xl`}
    >
      <div className="w-full h-screen py-6 transition-all duration-200 delay-75 relative">
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
            className="block xl:hidden p-2 pl-4 hover:bg-gray-500/20 active:bg-gray-500/20 rounded-full active:ring-1 ring-purple-500 cursor-pointer transition duration-300 delay-75 group"
          >
            {!isOpen ? (
              <Tooltip title="expand" arrow placement="right">
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
              <Tooltip title="collaps" arrow placement="right">
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
        <div className="md:h-[70vh] w-full overflow-y-scroll scrollbar-hidden">
          <div className={`w-full flex flex-col ${isOpen ? "gap-3" : "gap-5"}`}>
            {items.map((Item, index) => (
              <div key={index}>
                {!isOpen ? (
                  <Button
                    variant="text"
                    onClick={() => {
                      setActiveTab(Item.id);
                      router.push(Item.link);
                    }}
                    className={`w-fit flex items-center  px-0 }hover:bg-gray-500/20 active:bg-gray-500/30 active:scale-95 cursor-pointer transition duration-300 delay-75`}
                  >
                    <Tooltip title={Item.name} arrow placement="right">
                      <div
                        className={`w-full flex items-center justify-center py-1 ${
                          Item.id === 4
                            ? "text-amber-400"
                            : `${
                                isDarkMode ? "text-green-500" : "text-blue-800"
                              }`
                        } ${activeTab === Item.id ? "bg-purple-500/30" : ""}
                    `}
                      >
                        <Item.Icon />
                      </div>
                    </Tooltip>
                  </Button>
                ) : (
                  <div
                    onClick={() => {
                      setActiveTab(Item.id);
                      router.push(Item.link);
                    }}
                    className={`w-full flex items-center gap-2 py-2 px-4 ${
                      activeTab === Item.id
                        ? "bg-purple-500/20 hover:bg-purple-500/40 active:bg-purple-500/50 active:scale-95"
                        : "hover:bg-purple-500/20 active:bg-purple-500/30 active:scale-95"
                    }  cursor-pointer transition duration-300 delay-75`}
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
              </div>
            ))}
          </div>
          <div className="w-full h-[1px] my-4 bg-gray-600/50"></div>
        </div>

        {/* profile or login  */}
        <div className="absolute bottom-3 w-full backdrop-blur-3xl">
          <div className="w-full flex flex-col items-center justify-center gap-3">
            <div className="w-full flex items-center justify-center">
              <Button
                onClick={() => router.push("/pricing")}
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
                <Button
                  onClick={() => router.push("/profile")}
                  component="label"
                  className={`${isOpen ? "w-[80%]" : "px-2"}`}
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<MdOutlineLogout size={16} />}
                >
                  <p className={`${isOpen ? "block" : "hidden"}`}>Logout</p>
                </Button>
              ) : (
                <Button
                  onClick={() => router.push("/auth")}
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
    </div>
  );
};

export default Sidebar;
