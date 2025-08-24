"use client";
import React, { useEffect } from "react";
import "../../css/sidebar.css";
import { useAppDispatch, useAppSelector } from "../hooks";
import { changeTheme } from "@/features/theme/themeSlice";
import CourseContent from "@/components/custom/CourseContent";
import { getAllPlaylist } from "@/features/playlist/playlists";

const Courses = () => {
  const dispatch = useAppDispatch();

  const { playlists } = useAppSelector((state) => state.playlists);
  useEffect(() => {
    const load = localStorage.getItem("p_xyz");
    const theme = load ? JSON.parse(load) : null;
    dispatch(changeTheme(theme));
    dispatch(getAllPlaylist());
  }, [dispatch]);

  console.log("playlists in courses page: ", playlists);

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
