"use client";
import React, { useEffect } from "react";
import Header from "@/components/custom/Header";
import { useAppDispatch, useAppSelector } from "../hooks";
import { changeTheme } from "@/features/theme/themeSlice";
import "../../css/sidebar.css";
const CourseLayout = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const load = localStorage.getItem("p_xyz");
    const theme = load ? JSON.parse(load) : null;
    dispatch(changeTheme(theme));
  }, [dispatch]);

  return (
    <div
      className={`w-full   ${
        !isDarkMode
          ? "bg-stone-100 text-gray-600"
          : " bg-gray-800 text-stone-100"
      }`}
    >
      <Header  />
      <div className="w-full h-[89vh] sm:h-[86vh] overflow-y-scroll scrollbar-hidden">{children}</div> 
    </div>
  );
};

export default CourseLayout;