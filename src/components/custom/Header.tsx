"use client";
import React from "react";
import { MdLightMode, MdNightlight } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeTheme } from "@/features/theme/themeSlice";
import FloatSidebar from "./FloatSidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

const CourseHeader = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();
  const location = usePathname();

  const isProfile =
    location === "/profile"
      ? true
      : location === "/profile/edit-profile"
      ? true
      : location === "/profile/enrolled-courses"
      ? true
      : location === "/profile/subscriptions"
      ? true
      : false;

  const handleTheme = () => {
    dispatch(changeTheme(!theme));
    localStorage.setItem("p_xyz", JSON.stringify(!theme));
  };

  return (
    <div className="w-full mx-auto items-center p-4 sm:py-4 md:pt-8 md:px-8">
      <nav className="w-full flex items-center justify-between gap-5">
        {!isProfile ? (
          <FloatSidebar />
        ) : (
          <Link href="/courses" className="flex items-center space-x-2 group">
            <span className="block sm:hidden text-xl  font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Neura
            </span>
          </Link>
        )}
        <div className="w-full flex items-center justify-end gap-5">
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
