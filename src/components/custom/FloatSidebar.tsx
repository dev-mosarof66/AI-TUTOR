"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";
import "../../css/sidebar.css";
import { useRouter } from "next/navigation";
import { FaBars, FaStar, FaFire, FaUser, FaTimes } from "react-icons/fa";
import { MdHome, MdOutlineLogout } from "react-icons/md";
import { LuArrowBigUpDash, LuLogIn } from "react-icons/lu";
import { useAppSelector } from "@/app/hooks";

const menuItems = [
  { id: 1, name: "Home", icon: <MdHome size={24} />, link: "/courses" },
  {
    id: 2,
    name: "Popular",
    icon: <FaStar size={21} />,
    link: "/courses/popular",
  },
  {
    id: 3,
    name: "My Courses",
    icon: <FaFire size={20} />,
    link: "/courses/my-courses",
  },
  { id: 4, name: "Profile", icon: <FaUser size={20} />, link: "/profile" },
];

const FloatSidebar = () => {
  const router = useRouter();
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const { user } = useAppSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  const handleNavClick = (id: number, link: string) => {
    setActiveTab(id);
    router.push(link);
    setIsOpen(false);
  };

  return (
    <div className="block md:hidden">
      {/* Toggle button */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-1 rounded-full text-purple-700 hover:bg-purple-500/20 cursor-pointer transition duration-75"
      >
        {isOpen ? (
          <FaTimes
            size={24}
          />
        ) : (
          <FaBars
            size={22}
          />
        )}
      </div>

      {/* Sidebar content */}
      <div className="w-full fixed backdrop-blur-xl left-0 top-14 z-50">
        <div
          className={`w-[90%] mx-auto  flex flex-col gap-2 items-center justify-center ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {isOpen &&
            menuItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNavClick(item.id, item.link)}
                className={`w-full flex items-center justify-center gap-2 py-2 px-4 cursor-pointer transition duration-300 delay-75 ${
                  activeTab === item.id
                    ? "bg-purple-500/20 hover:bg-purple-500/40 active:bg-purple-500/50 active:scale-95"
                    : "hover:bg-purple-500/20 active:bg-purple-500/30 active:scale-95"
                }`}
              >
                <p>{item.name}</p>
              </div>
            ))}

          {isOpen && (
            <>
              <div className="w-full h-[1px] my-4 bg-gray-600/50"></div>
              <div className="w-full pb-4 flex flex-col items-center gap-3">
                {/* Upgrade button */}
                <Button
                  onClick={() => router.push("/pricing")}
                  className="w-[80%]"
                  variant="outlined"
                  startIcon={<LuArrowBigUpDash />}
                >
                  <p>UPGRADE</p>
                </Button>

                {/* Auth button */}
                {user ? (
                  <Button
                    onClick={() => router.push("/profile")}
                    className="w-[80%]"
                    variant="contained"
                    startIcon={<MdOutlineLogout size={16} />}
                  >
                    <p>Logout</p>
                  </Button>
                ) : (
                  <Button
                    onClick={() => router.push("/auth")}
                    className="w-[80%]"
                    variant="contained"
                    startIcon={<LuLogIn />}
                  >
                    <p>Join Now</p>
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FloatSidebar;
