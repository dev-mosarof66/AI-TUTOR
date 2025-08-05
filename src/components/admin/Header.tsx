"use client";
import React, { useState } from "react";
import { MdLightMode, MdNightlight } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeTheme } from "@/features/theme/themeSlice";
import { Button } from "@mui/material";
import { FaBars } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface HeaderItem {
  id: number;
  name: string;
  Icon: React.ElementType;
  navigation: string;
}

interface HeaderProps {
  items: HeaderItem[];
  isLarge: boolean;
}

const Header = ({ items, isLarge }: HeaderProps) => {
  const router = useRouter();
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const [shownavbar, setShownavbar] = useState(false);
  const dispatch = useAppDispatch();

  const handleTheme = () => {
    dispatch(changeTheme(!isDarkMode));
    localStorage.setItem("p_xyz", JSON.stringify(!isDarkMode));
  };

  return (
    <div className="w-full   mx-auto items-center p-4">
      {/* Top bar */}
      <nav
        className={`w-full xl:w-[95%] mx-auto xl:py-3 flex items-center ${
          !isLarge ? "justify-between" : "justify-end"
        } gap-5`}
      >
        {!isLarge && (
          <Button
            onClick={() => setShownavbar(!shownavbar)}
            aria-label="Toggle menu"
          >
            <FaBars size={22} />
          </Button>
        )}
        <div
          onClick={handleTheme}
          className="p-2 mx-4 bg-purple-500/20 hover:bg-purple-500/30 active:ring active:ring-purple-600 rounded-full cursor-pointer transition duration-500 delay-75"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <MdLightMode className="text-yellow-400" />
          ) : (
            <MdNightlight className="text-green-500 -rotate-45" />
          )}
        </div>
      </nav>

      {/* Divider */}
      <div className="w-full h-[1px] mt-2 bg-purple-300/50" />

      {/* Dropdown nav menu */}
      {shownavbar && !isLarge && (
        <div className="w-full fixed top-16 left-0 z-[99999] backdrop-blur-sm py-4 flex flex-col items-center gap-2">
          {items.map((tab) => (
            <div
              onClick={() => {
                router.push(tab.navigation);
                setShownavbar(false);
              }}
              key={tab.id}
              className={`w-[90%] flex items-center justify-center gap-2 px-4 py-2 rounded-sm ${
                isDarkMode
                  ? "text-gray-200 bg-purple-500/30"
                  : "text-gray-900 bg-purple-200/70"
              } hover:bg-purple-500/40 active:scale-[0.98] cursor-pointer transition duration-300 delay-75`}
            >
              {tab.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
