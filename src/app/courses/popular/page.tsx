"use client";
import { useAppSelector } from "@/app/hooks";
import CourseCard from "@/components/custom/CourseCard";
import React, { useEffect, useState } from "react";
import playlists from "@/../data.js";

const PopularCourse = () => {
  const { loading } = useAppSelector((state) => state.playlists);
  const [popularCourses, setPopularCourses] = useState<typeof playlists>([]);

  useEffect(() => {
    const filtered = playlists.filter((course) => course.popular === true);
    setPopularCourses(filtered);
  }, []);

  return (
    <div className="w-[96%] mx-auto">
      <CourseCard courses={popularCourses} loading={loading} />
    </div>
  );
};

export default PopularCourse;
