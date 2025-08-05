"use client";
import Sidebar from "@/components/custom/sidebar";
import React, { useEffect, useState } from "react";
import { FaStar, FaFire } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import "../../css/sidebar.css";
import { useAppDispatch, useAppSelector } from "../hooks";
import { changeTheme } from "@/features/theme/themeSlice";
import Header from "@/components/custom/Header";
import Search from "@/components/custom/Search";

interface Type {
  children: React.ReactNode;
}

const Items = [
  {
    id: 1,
    name: "Home",
    Icon: () => <MdHome size={24} />,
    link: "/courses",
  },
  {
    id: 2,
    name: "Popular",
    Icon: () => <FaStar size={21} />,
    link: "/courses/popular",
  },
  {
    id: 3,
    name: "My Courses",
    Icon: () => <FaFire size={20} />,
    link: "/courses/my-courses",
  },
];

const CourseLayout = ({ children }: Type) => {
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const [searchMode, setSearchMode] = useState(false);
  const dispatch = useAppDispatch();
  console.log("isDarkMode in course", isDarkMode);
  useEffect(() => {
    const load = localStorage.getItem("p_xyz");
    const theme = load ? JSON.parse(load) : null;
    dispatch(changeTheme(theme));
  }, [dispatch]);
  return (
    <div
      className={`w-full h-screen flex  ${
        !isDarkMode ? "bg-stone-100" : " bg-gray-800"
      }`}
    >
      <Sidebar items={Items} isDarkMode={isDarkMode} />
      <div className="w-[95%] mx-auto sm:w-[90%] h-screen ">
          <Header setSearchMode={setSearchMode} hideSearch={false} />
        <div className="w-full h-[88vh] md:h-[86vh] pt-10 md:pt-4 overflow-y-scroll scrollbar-hidden">
          {children}
        </div>
      </div>
      {searchMode && (
        <Search setSearchMode={setSearchMode} isDarkMode={isDarkMode} />
      )}
    </div>
  );
};

export default CourseLayout;
