"use client";
import Sidebar from "@/components/custom/sidebar";
import React, { useEffect } from "react";
import { FaStar, FaFire } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { MdHome } from "react-icons/md";
import "../../css/sidebar.css";
import CourseContent from "@/components/custom/CourseContent";
import { useAppDispatch, useAppSelector } from "../hooks";
import { changeTheme } from "@/features/theme/themeSlice";

const Items = [
  {
    id: 1,
    name: "Home",
    Icon: () => <MdHome size={24} />,
  },
  {
    id: 2,
    name: "Courses",
    Icon: () => <SiBookstack size={20} />,
  },
  {
    id: 3,
    name: "Popular",
    Icon: () => <FaStar size={21} />,
  },
  {
    id: 4,
    name: "Strike",
    Icon: () => <FaFire size={20} />,
  },
];

const Course = () => {
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();
  console.log("isDarkMode in course", isDarkMode);
  useEffect(() => {
    const load = localStorage.getItem("p_xyz");
    const theme = load ? JSON.parse(load) : null;
    dispatch(changeTheme(theme));
  }, []);
  return (
    <div
      className={`w-full h-screen flex items-center ${
        !isDarkMode ? "bg-stone-50" : " bg-gray-800"
      }`}
    >
      <Sidebar items={Items} isDarkMode={isDarkMode} />
      {/*sidebar placeholder  */}
      <div className="w-16 sm:w-18" />
      <CourseContent />
    </div>
  );
};

export default Course;
