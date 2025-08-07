import { useAppSelector } from "@/app/hooks";
import CourseCard from "@/components/custom/CourseCard";
import React from "react";



const PopularCourse = () => {
  const { playlists, loading } = useAppSelector((state) => state.playlists);
  return (
    <div>
      <CourseCard courses={playlists} loading={loading} />
    </div>
  );
};

export default PopularCourse;
