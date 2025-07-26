"use client";
import { useAppSelector } from "@/app/hooks";
import React, { ReactNode } from "react";

const Tabs = [
  {
    id: 0,
    name: "Web",
  },
  {
    id: 1,
    name: "C",
  },
  {
    id: 2,
    name: "JavaScript",
  },
  {
    id: 3,
    name: "Python",
  },
  {
    id: 4,
    name: "Java",
  },
  {
    id: 5,
    name: "C++",
  },
  {
    id: 6,
    name: "Ruby",
  },
];



const CourseContent = () => {
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  return (
    <div className="w-full">
      <div className="w-full md:w-[580px] xl:w-full flex items-center overflow-x-scroll">
        {Tabs.map((tab) => (
          <div
            className={`px-6 py-1 rounded-sm ${
              isDarkMode ? "bg-purple-500/30 text-gray-300" : "bg-gray-600/30"
            } mx-4 `}
            key={tab.id}
          >
            <h2>{tab.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContent;
