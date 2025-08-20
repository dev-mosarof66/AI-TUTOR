"use client";
import React, { useState } from "react";
import "../../css/sidebar.css";
import { Button } from "@mui/material";
import CourseCard from "./CourseCard";
import { Playlist } from "@/features/playlist/playlists";

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

interface PlaylistsProps {
  playlists: Playlist[];
  loading: boolean;
}

const CourseContent = ({ playlists, loading }: PlaylistsProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [courses, setCourses] = useState(playlists);
  const filterCourses = (category: string, id: number) => {
    setSelectedTab(id);
    console.log(category);
    if (category.toUpperCase() === "ALL") {
      console.log("inside all");
      setCourses(playlists);
    } else {
      const courses = playlists.filter((t) => category === t.category);
      console.log(courses);
      setCourses(courses);
    }
  };
  return (
    <div className="w-full">
      <div className="w-full md:w-[580px] xl:w-full flex items-center gap-2 overflow-x-scroll scrollbar-hidden">
        {Tabs.map((tab) => (
          <div
            onClick={() => filterCourses(tab.name, tab.id)}
            key={tab.id}
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
        <CourseCard courses={courses} loading={loading} />
      </div>
    </div>
  );
};

export default CourseContent;
