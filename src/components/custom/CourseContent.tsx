"use client";
import React, { useState } from "react";
import "../../css/sidebar.css";
import CourseHeader from "./CourseHeader";
import Search from "./Search";
import { useAppSelector } from "@/app/hooks";

const CourseContent = () => {
  const [searchMode, setSearchMode] = useState(false);
  const isDarkMode = useAppSelector((state)=>state.theme.theme)


  return (
    <div className="w-full h-screen overflow-y-scroll scrollbar-hidden p-2 xs:p-4">
      <CourseHeader setSearchMode={setSearchMode} />
      {searchMode && <Search setSearchMode={setSearchMode} isDarkMode={isDarkMode} />}
    </div>
  );
};

export default CourseContent;
