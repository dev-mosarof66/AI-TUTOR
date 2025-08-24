"use client";
import React, { useState } from "react";
import "../../css/sidebar.css";
import { Button } from "@mui/material";
import CourseCard from "./CourseCard";

const Tabs = [
  {
    id: 0,
    name: "All",
  },
  {
    id: 1,
    name: "C",
  },
  {
    id: 2,
    name: "JS",
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
  {
    id: 7,
    name: "Web",
  },
];

const CourseContent = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="w-full">
      <div className="w-full md:w-[580px] xl:w-full flex items-center gap-2 overflow-x-scroll scrollbar-hidden">
        {Tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`${
              selectedTab === tab.id && "bg-purple-500/30"
            } duration-200 delay-100 cursor-pointer rounded-sm`}
          >
            <Button
              variant="text"
              className={`px-6 py-1  cursor-pointer transition duration-300 delay-75 active:scale-95`}
            >
              {tab.name}
            </Button>
          </div>
        ))}
      </div>
      <div>
        <CourseCard />
      </div>
    </div>
  );
};

export default CourseContent;
