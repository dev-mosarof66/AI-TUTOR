"use client";
import React, { useEffect, useState } from "react";
import "../../css/sidebar.css";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { LuLogIn, LuArrowBigUpDash } from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/app/hooks";
import { MdOutlineLogout } from "react-icons/md";
import { logout } from "@/helper/auth";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../loader";
import { CustomButtonThree } from "../ui/custom-button";

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
  const location = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(1);
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

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

  //useeffect to retrieve the active tabs

  useEffect(() => {
    if (location === "/courses") {
      setActiveTab(1);
    } else if (location === "/courses/popular") {
      setActiveTab(2);
    } else if (location === "/courses/my-courses") {
      setActiveTab(3);
    }
  }, [location]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await logout();
      if (!response) return;

      const res = await axios.post("/api/auth/logout", {
        withCredentials: true,
      });
      if (res.status === 201) {
        toast.success(res.data.message, { position: "top-right" });
        router.push("/");
      }
    } catch (error) {
      const status =
        axios.isAxiosError(error) && error.response
          ? error.response.status
          : 500;
      if (status === 500) {
        toast.error("Internal server error", { position: "top-right" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`hidden md:block ${
        isOpen ? "w-64 lg:w-72 xl:w-96" : "w-fit"
      } h-screen border-r ${
        isDarkMode
          ? "bg-gray-800 text-gray-300 border-r-white/50"
          : "bg-white text-gray-600 border-r-gray-400/50"
      }  backdrop-blur-2xl`}
    >
      <div className="w-full h-screen py-6  relative">
        {/* header */}
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
              <div className="tooltip tooltip-right" data-tip="Expand">
                <GoSidebarCollapse
                  size={19}
                  className={`${
                    isDarkMode
                      ? "text-gray-300 group-active:text-gray-500"
                      : "text-gray-600 group-active:text-gray-500"
                  } transform duration-300 delay-75`}
                />
              </div>
            ) : (
              <div className="tooltip tooltip-right" data-tip="Collapse">
                <GoSidebarExpand
                  size={19}
                  className={`${
                    isDarkMode
                      ? "text-gray-300 group-active:text-gray-500"
                      : "text-gray-600 group-active:text-gray-500"
                  } transform duration-300 delay-75`}
                />
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-[1px] my-4 bg-purple-400/30"></div>

        {/* sidebar items */}
        <div className="md:h-[70vh] w-full overflow-y-scroll scrollbar-hidden">
          <div className={`w-full flex flex-col ${isOpen ? "gap-3" : "gap-5"}`}>
            {items.map((Item, index) => (
              <div
                key={index}
                onClick={() => {
                  setActiveTab(Item.id);
                }}
              >
                <CustomButtonThree
                  router={Item.link}
                  className={`w-full flex items-center gap-2 py-2 px-4 ${
                    activeTab === Item.id
                      ? "bg-purple-500/20 hover:bg-purple-500/40 active:bg-purple-500/50 active:scale-95"
                      : "hover:bg-purple-500/20 active:bg-purple-500/30 active:scale-95"
                  } cursor-pointer transition duration-300 delay-75`}
                >
                  <div className="flex items-center gap-4">
                    <Item.Icon />
                    <p className={`${isOpen ? "block" : "hidden"}`}>
                      {Item.name}
                    </p>
                  </div>
                </CustomButtonThree>
              </div>
            ))}
          </div>
          <div className="w-full h-[1px] my-4 bg-gray-600/50"></div>
        </div>

        {/* footer */}
        <div className="absolute bottom-3 w-full backdrop-blur-3xl">
          <div className="w-full flex flex-col items-center justify-center gap-3">
            {/* upgrade button */}
            <div className="w-full flex items-center justify-center">
              <CustomButtonThree
                router="/pricing"
                className={`${
                  isOpen ? "w-[80%]" : "w-full"
                } flex items-center justify-center  border border-purple-600 hover:text-purple-500 cursor-pointer transition-colors duration-300 delay-75`}
              >
                <div className="w-full flex items-center justify-center py-2 gap-2">
                  <LuArrowBigUpDash size={24} />
                  <p className={`${isOpen ? "block" : "hidden"}`}>Upgrade</p>
                </div>
              </CustomButtonThree>
            </div>

            {/* auth */}
            <div className="w-full flex items-center justify-center">
              {user ? (
                <div
                  onClick={handleLogout}
                  className={`${
                    isOpen ? "w-[80%]" : "w-full"
                  }  mx-auto px-6 py-2  flex items-center justify-center gap-2  border border-purple-600 hover:bg-purple-600 hover:text-white cursor-pointer transition-all duration-300 delay-75`}
                >
                  {loading ? (
                    <Loader />
                  ) : (
                    <div className="w-full flex items-center justify-center gap-2">
                      <MdOutlineLogout size={24} />
                      <p className={`${isOpen ? "block" : "hidden"}`}>Logout</p>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  onClick={() => router.push("/auth")}
                  className={`${
                    isOpen ? "w-[80%]" : "w-full"
                  }  mx-auto px-6 py-2  flex items-center justify-center gap-2  border border-purple-600 hover:bg-purple-600 hover:text-white cursor-pointer transition-all duration-300 delay-75`}
                >
                  <LuLogIn />
                  <p className={`${isOpen ? "block" : "hidden"}`}>Join Now</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
