"use client";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { MdLightMode, MdNightlight } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeTheme } from "@/features/theme/themeSlice";
import { useRouter } from "next/navigation";
import FloatSidebar from "./FloatSidebar";

interface CourseHeaderProps {
  setSearchMode: (value: boolean) => void;
  hideSearch: boolean;
}

const CourseHeader = ({
  setSearchMode,
  hideSearch = false,
}: CourseHeaderProps) => {
  const router = useRouter();
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();

  const handleTheme = () => {
    dispatch(changeTheme(!theme));
    localStorage.setItem("p_xyz", JSON.stringify(!theme));
  };

  return (
    <div className="w-full mx-auto items-center p-4 sm:py-4 md:pt-8 md:px-8">
      <nav className="w-full flex items-center justify-between gap-5">
        {hideSearch && (
          <div>
            <h1
              onClick={() => router.push("/courses")}
              className={`block sm:hidden text-xl sm:text-2xl font-semibold text-green-500 hover:text-green-600 active:text-green-600 cursor-pointer  transition-transform duration-300 delay-75 pl-3`}
            >
              Neura
            </h1>
          </div>
        )}
        {!hideSearch && <FloatSidebar />}
        <div className="w-full flex items-center justify-end gap-5">
          {!hideSearch && (
            <div
              onClick={() => setSearchMode(true)}
              className="p-2 bg-purple-500/20 hover:bg-purple-500/30 active:ring active:ring-purple-600 rounded-full cursor-pointer transition duration-500 delay-75"
            >
              <FaSearch className="text-purple-500" />
            </div>
          )}
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
        </div>
      </nav>
    </div>
  );
};

export default CourseHeader;
