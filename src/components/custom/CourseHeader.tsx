"use client";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { MdLightMode, MdNightlight } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeTheme } from "@/features/theme/themeSlice";

interface CourseHeaderProps {
  setSearchMode: (value: boolean) => void;
}

const CourseHeader = ({ setSearchMode }: CourseHeaderProps) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();

  const handleTheme = () => {
    dispatch(changeTheme(!theme));
    localStorage.setItem("p_xyz", JSON.stringify(!theme));
  };

  return (
    <div className="w-full items-center justify-center">
      <nav className="w-full flex items-center justify-end gap-5 p-3 sm:p-8">
        <div
          onClick={() => setSearchMode(true)}
          className="p-2 bg-purple-500/20 hover:bg-purple-500/30 active:ring active:ring-purple-600 rounded-full cursor-pointer transition duration-500 delay-75"
        >
          <FaSearch className="text-purple-500" />
        </div>
        <div
          onClick={handleTheme}
          className="p-2 bg-purple-500/20 hover:bg-purple-500/30 active:ring active:ring-purple-600 rounded-full cursor-pointer transition duration-500 delay-75"
        >
          {theme ? (
            <MdLightMode className="text-yellow-400" />
          ) : (
            <MdNightlight className="text-green-500 -rotate-45" />
          )}
        </div>
      </nav>
    </div>
  );
};

export default CourseHeader;
