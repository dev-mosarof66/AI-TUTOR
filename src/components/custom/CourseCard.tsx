"use client";
import React from "react";
import { useAppSelector } from "@/app/hooks";
import "../../css/sidebar.css";

import { FaHourglassStart } from "react-icons/fa6";
import { MdOutlineDiscount } from "react-icons/md";
import { BsFillTriangleFill } from "react-icons/bs";
import { FaSquare, FaPlaystation } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

interface Course {
  title: string;
  description: string;
  id: number;
  duration: string;
  level: string;
  lessons: number;
}

interface Props {
  courses: Course[];
}

const CourseCard = ({ courses }: Props) => {
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const router = useRouter();
  const textColor = isDarkMode ? "text-gray-300" : "text-gray-800";
  const subTextColor = isDarkMode ? "text-gray-400" : "text-gray-600";
  const cardBg = isDarkMode ? "bg-purple-800/20" : "bg-purple-400/30";
  const iconColor = isDarkMode ? "text-purple-300" : "text-purple-700";

  return (
    <div className="w-full">
      {courses.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No courses available.</p>
      ) : (
        <div className="w-full my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <article
              key={course.id}
              className={`w-full ${cardBg} p-5 rounded-xl shadow-md hover:scale-[1.01] active:ring active:ring-green-500 active:scale-95 transition-all cursor-pointer duration-200`}
            >
              <div className="flex flex-col gap-2">
                <h1 className={`text-xl font-semibold ${textColor}`}>
                  {course.title}
                </h1>
                <p className={`text-sm ${subTextColor}`}>
                  {course.description}
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
                      {course.level.toUpperCase()}
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
                    <span>{course.lessons}</span>
                  </div>
                </div>
                <Button
                  onClick={() => router.push(`/course/${course.id}`)}
                  variant="outlined"
                  size="small"
                  startIcon={<FaPlaystation className="text-green-400" />}
                >
                  Start
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseCard;
