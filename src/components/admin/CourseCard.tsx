"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/app/hooks";
import "../../css/sidebar.css";
import { IoAnalyticsSharp } from "react-icons/io5";
import { FaHourglassStart } from "react-icons/fa6";
import { MdOutlineDiscount } from "react-icons/md";
import { BsFillTriangleFill } from "react-icons/bs";
import { FaSquare } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import CourseAnalyticsPage from "./CourseAnalytics";

interface ModuleType {
  title: string;
  comments: string[];
  videos: string[];
}

interface PlaylistType {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  duration: number | null;
  level: string | null;
  modules: ModuleType[];
  popular: boolean;
  __v: number;
}

interface Prop {
  courses: PlaylistType[];
}

const CourseCard = ({ courses }: Prop) => {
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const router = useRouter();
  const textColor = isDarkMode ? "text-gray-300" : "text-gray-800";
  const subTextColor = isDarkMode ? "text-gray-400" : "text-gray-600";
  const cardBg = isDarkMode ? "bg-purple-800/20" : "bg-purple-400/30";
  const iconColor = isDarkMode ? "text-purple-300" : "text-purple-700";

  return (
    <div className="w-full">
      <div className="w-full">
        {courses.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No courses available.
          </p>
        ) : (
          <div className="w-full my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <article
                key={course._id}
                onClick={() => router.push(`/admin/playlists/${course._id}`)}
                className={`w-full ${cardBg} ${
                  index % 4 === 0 && courses.length > 1 ? "lg:col-span-2" : ""
                } flex flex-col justify-between p-5 rounded-xl shadow-md hover:scale-[1.01] active:ring active:ring-green-500 active:scale-95 transition-all cursor-pointer duration-200`}
              >
                <div className="flex flex-col gap-2">
                  <h1 className={`text-xl font-semibold ${textColor}`}>
                    {course.title}
                  </h1>
                  <p className={`text-sm ${subTextColor}`}>
                    {course.description.length > 250
                      ? course.description.slice(0, 150) + "..."
                      : course.description}
                  </p>
                </div>

                <div className="flex  items-center justify-between flex-wrap gap-3 mt-4 text-sm">
                  <div className="flex items-center gap-4 text-sm">
                    {/* Level */}
                    <div className={`flex items-center gap-1 ${iconColor}`}>
                      {course.level === "basic" ? (
                        <BsFillTriangleFill className="text-green-500" />
                      ) : (
                        <FaSquare className="text-red-500" />
                      )}
                      <span className="hidden xs:inline">
                        {/* {course.level.toUpperCase()} */}
                      </span>
                    </div>

                    {/* Duration */}
                    <div className={`flex items-center gap-1 ${iconColor}`}>
                      <FaHourglassStart />
                      <span>{course.duration}</span>
                    </div>

                    {/* Lessons */}
                    <div className={`flex items-center gap-1 ${iconColor}`}>
                      <MdOutlineDiscount />
                      {/* <span>{course.modules}</span> */}
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowAnalytics(true)}
                    variant="outlined"
                    size="small"
                    startIcon={<IoAnalyticsSharp className="text-green-400" />}
                  >
                    ANALYTICS
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      {showAnalytics && (
        <div className="w-full h-screen overflow-y-scroll flex justify-center fixed top-0 left-0  backdrop-blur-sm">
          <CourseAnalyticsPage courseId="ml-beginners" />
        </div>
      )}
    </div>
  );
};

export default CourseCard;
