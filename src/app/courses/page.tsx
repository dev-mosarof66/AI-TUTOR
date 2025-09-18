"use client";
import React, { useEffect, useState } from "react";
import "../../css/sidebar.css";
import { useAppSelector } from "../hooks";
import CourseCard from "@/components/custom/CourseCard";
import PlaylistSkeleton from "@/components/admin/PlaylistSkeleton";
import { Playlist } from "@/features/playlist/playlists";

const Courses = () => {
  const { playlists, loading } = useAppSelector((state) => state.playlists);
  const [popularCourses, setPopularCourses] = useState<Playlist[]>([]);
  console.log("courses in popular course", popularCourses);

  useEffect(() => {
    setPopularCourses(playlists);
  }, [playlists]);

  return (
    <div
      className={`w-[95%] mx-auto  flex flex-col items-center justify-center`}
    >
      <Header />
      {/* divider  */}
      <div
        className={`w-full bg-gradient-to-r  via-purple-400  h-[2px] my-4`}
      ></div>
      {/* courses  */}
      <div className="w-full px-4  mb-6">
        {loading ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PlaylistSkeleton />
            <PlaylistSkeleton />
            <PlaylistSkeleton />
            <PlaylistSkeleton />
            <PlaylistSkeleton />
            <PlaylistSkeleton />
          </div>
        ) : popularCourses.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No courses available.
          </p>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCourses.map((course) => {
              const duration = course.duration ?? 0;
              const hours = Math.floor(duration / 3600);
              const minutes = Math.floor((duration % 3600) / 60);
              return (
                <CourseCard
                  key={course._id}
                  course={course}
                  hours={hours}
                  minutes={minutes}
                  link={`/course/${course._id}`}
                />
              );
            })}
          </div>
        )}
      </div>
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
