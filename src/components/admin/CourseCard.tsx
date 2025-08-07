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
  duration: number | null; // in seconds
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
  const [showAnalytics, setShowAnalytics] = useState<string | null>(null);
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
            No playlists available.
          </p>
        ) : (
          <div className="w-full my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => {
              let hours = 0,
                minutes = 0;
              if (typeof course.duration === "number" && course.duration >= 0) {
                hours = Math.floor(course.duration / 3600);
                const rem = course.duration % 3600;
                minutes = Math.floor(rem / 60);
              }

              return (
                <article
                  key={course._id}
                  onClick={() => router.push(`/admin/playlists/${course._id}`)}
                  className={`w-full ${cardBg} ${
                    index % 4 === 0 && courses.length > 1 ? "lg:col-span-2" : ""
                  } flex flex-col justify-between p-5 rounded-xl shadow-md hover:scale-[1.01] active:ring active:ring-green-500 active:scale-95 transition-all cursor-pointer duration-200`}
                  aria-label={`Course card for ${course.title}`}
                >
                  <div className="flex flex-col gap-2">
                    <h1 className={`text-xl font-semibold ${textColor}`}>
                      {course.title}
                    </h1>
                    <p className={`text-sm ${subTextColor}`}>
                      {course.description
                        ? course.description.length > 250
                          ? course.description.slice(0, 150) + "..."
                          : course.description
                        : "No description provided."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-3 mt-4 text-sm">
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      {/* Level */}
                      <div className={`flex items-center gap-1  ${iconColor}`}>
                        {course.level === "basic" ? (
                          <BsFillTriangleFill className="text-green-500" />
                        ) : course.level === "advance" ? (
                          <FaSquare className="text-red-500" />
                        ) : (
                          <div className="w-4 h-4 rounded bg-gray-400" />
                        )}
                      </div>

                      {/* Duration */}
                      <div className={`flex items-center gap-1 ${iconColor}`}>
                        <FaHourglassStart size={15} />
                        <span className="ml-1">
                          {course.duration != null ? (
                            <span className="text-xs">
                              {hours === 0 ? "" : hours + " h : "} {minutes}m
                            </span>
                          ) : (
                            "0"
                          )}
                        </span>
                      </div>

                      {/* Lessons count */}
                      <div className={`flex items-center gap-1 ${iconColor}`}>
                        <MdOutlineDiscount size={18} />
                        <span className="text-sm">
                          {course.modules?.length ?? 0}
                        </span>
                      </div>
                    </div>

                    <div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowAnalytics(course._id);
                        }}
                        variant="outlined"
                        size="small"
                        startIcon={
                          <IoAnalyticsSharp className="text-green-400" />
                        }
                      >
                        ANALYTICS
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {showAnalytics && (
        <div className="w-full h-screen overflow-y-scroll flex justify-center fixed top-0 left-0 backdrop-blur-sm">
          <CourseAnalyticsPage courseId={showAnalytics} />
          <button
            onClick={() => setShowAnalytics(null)}
            className="absolute top-4 right-4 px-3 py-1 bg-white rounded shadow"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
