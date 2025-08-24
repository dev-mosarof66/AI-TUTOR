"use client";
import React from "react";
import "../../css/sidebar.css";
import { useAppSelector } from "../hooks";
import CourseContent from "@/components/custom/CourseContent";

const Courses = () => {


  return (
    <div
      className={`w-[95%] mx-auto  flex flex-col items-center justify-center`}
    >
      <Header />
      {/* divider  */}
      <div className={`w-full bg-gray-500 h-[1px] my-4`}></div>
      {/* courses  */}
      <CourseContent />
    </div>
  );
};

const Header = () => {
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  return (
    <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-3">
      <h1
        className={`w-[80%] text-2xl xs:text-3xl sm:text-4xl xs:w-xs text-center ${
          isDarkMode
            ? "bg-gradient-to-br from-green-500 to-purple-500 bg-clip-text text-transparent"
            : "bg-gradient-to-r from-green-500 to-purple-500 bg-clip-text text-transparent"
        }`}
      >
        BECOME A SOFTWARE ENGINEER
      </h1>
      <p
        className={`w-full xs:w-sm text-center text-sm xs:text-base sm:text-lg ${
          isDarkMode ? "text-gray-500" : "text-gray-500"
        }`}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ab
        praesentium voluptatum ea eos est!
      </p>
    </div>
  );
};

export default Courses;
