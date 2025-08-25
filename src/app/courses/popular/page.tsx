"use client";
import CourseCard from "@/components/custom/CourseCard";
import React, { useEffect } from "react";
import { useAppSelector } from "@/app/hooks";
import PlaylistSkeleton from "@/components/admin/PlaylistSkeleton";
import { Playlist } from "@/features/playlist/playlists";

const PopularCourse = () => {
  const { playlists, loading } = useAppSelector((state) => state.playlists);
  const [popularCourses, setPopularCourses] = React.useState<Playlist[]>([]);
    console.log('courses in popular course',popularCourses)

    useEffect(() => {
      const playlist = playlists.filter((course) => course.popular);
      setPopularCourses(playlist);
    }, [playlists]);


  return (
    <div className="w-full px-4 md:px-8 mb-6">
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
        <p className="text-center text-gray-500 py-10">No courses available.</p>
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
  );
};

export default PopularCourse;
