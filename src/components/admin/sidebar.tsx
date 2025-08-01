"use client";
import React, { useEffect, useState } from "react";
import { Button, Tooltip } from "@mui/material";
import "../../css/sidebar.css";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { LuLogIn } from "react-icons/lu";
import { useRouter, usePathname } from "next/navigation";

interface SidebarItem {
  id: number;
  name: string;
  Icon: React.ElementType;
  navigation: string;
}

interface SidebarProps {
  items: SidebarItem[];
  isDarkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ items, isDarkMode }) => {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<number>(1);
  const user = false;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(true);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!pathname) return;
    const matched = items.find((i) => {
      return pathname === i.navigation;
    });
    console.log(matched);
    if (matched) {
      setActiveTab(matched.id);
    }
  }, [pathname, items]);

  return (
    <div
      className={`hidden sm:block transition-all ${
        isOpen ? "w-72 xl:w-96" : "w-fit"
      } h-screen border-r ${
        isDarkMode
          ? "bg-gray-800 text-gray-300 border-r-white/50"
          : "bg-white text-gray-600 border-r-gray-400/50"
      }`}
    >
      <div className="h-screen py-6 relative">
        {/* Sidebar Header */}
        <div className="w-full flex items-center justify-between px-2">
          <div
            onClick={() => setIsOpen((o) => !o)}
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            className="block xl:hidden p-2 hover:bg-gray-500/20 rounded-full cursor-pointer transition group"
          >
            <Tooltip
              title={isOpen ? "Collapse" : "Expand"}
              arrow
              placement="right"
            >
              {isOpen ? (
                <GoSidebarCollapse
                  size={20}
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                />
              ) : (
                <GoSidebarExpand
                  size={20}
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                />
              )}
            </Tooltip>
          </div>
        </div>

        <div className="w-full h-[1px] my-4 bg-gray-600/30" />

        {/* Sidebar Items */}
        <div className="md:h-[70vh] overflow-y-scroll scrollbar-hidden">
          <div
            className={`w-full flex flex-col items-center ${
              isOpen ? "gap-3" : "gap-5"
            }`}
          >
            {items.map((item) => (
              <div key={item.id} className="w-full">
                {!isOpen ? (
                  <Tooltip title={item.name} arrow placement="right">
                    <Button
                      variant="text"
                      onClick={() => {
                        setActiveTab(item.id);
                        router.push(item.navigation);
                      }}
                      className="w-full flex items-center justify-center"
                    >
                      <div
                        className={`py-1 ${
                          item.id === 4
                            ? "text-amber-400"
                            : isDarkMode
                            ? "text-green-500"
                            : "text-blue-800"
                        } ${
                          activeTab === item.id ? "bg-purple-500/30 px-4" : ""
                        }`}
                      >
                        <item.Icon />
                      </div>
                    </Button>
                  </Tooltip>
                ) : (
                  <div
                    onClick={() => {
                      setActiveTab(item.id);
                      router.push(item.navigation);
                    }}
                    className={`w-full flex items-center gap-2 py-2 px-4 cursor-pointer transition ${
                      activeTab === item.id
                        ? "bg-purple-500/30 hover:bg-purple-500/50"
                        : "hover:bg-purple-500/20"
                    }`}
                  >
                    <div
                      className={`${
                        item.id === 4
                          ? "text-amber-400"
                          : isDarkMode
                          ? "text-green-500"
                          : "text-blue-800"
                      }`}
                    >
                      <item.Icon />
                    </div>
                    <p>{item.name}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="w-full h-[1px] my-4 bg-gray-600/50" />
        </div>

        {/* Footer Section */}
        <div className="absolute bottom-3 w-full backdrop-blur-3xl">
          <div className="w-full flex flex-col items-center justify-center gap-3">
            <div className="w-full flex justify-center">
              {user ? (
                <div></div>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<LuLogIn className="rotate-180" />}
                  className={isOpen ? "w-[80%]" : "px-2"}
                  onClick={() => {
                    /* implement logout if needed */
                  }}
                >
                  {isOpen && <span>Logout</span>}
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
