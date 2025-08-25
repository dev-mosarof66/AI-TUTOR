"use client";
import React from "react";
import { useAppSelector } from "@/app/hooks";
import "../../css/sidebar.css";
import CourseCard from "./CourseCard";
import PlaylistSkeleton from "@/components/admin/PlaylistSkeleton";

const CourseContent = () => {
  const { playlists, loading } = useAppSelector((state) => state.playlists);
  console.log('courses in coursecontent',playlists)

  return (
    <div className="w-full">
      {loading ? (
        <div className="w-full my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PlaylistSkeleton />
          <PlaylistSkeleton />
          <PlaylistSkeleton />
          <PlaylistSkeleton />
          <PlaylistSkeleton />
          <PlaylistSkeleton />
        </div>
      ) : playlists.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No courses available.</p>
      ) : (
        <div className="w-full my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((course) => {
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
  );
};

export default CourseContent;
