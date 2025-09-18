"use client";
import React from "react";
import { useAppSelector } from "@/app/hooks";
import "../../css/sidebar.css";
import { Playlist } from "@/features/playlist/playlists";
import { FaHourglassStart, FaSquare } from "react-icons/fa";
import { BsFillTriangleFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa6";
import { MdOutlineDiscount } from "react-icons/md";
import { useRouter } from "next/navigation";

interface Props {
  course: Playlist;
  hours: number;
  minutes: number;
  link: string;
}

const CourseCard = ({ course, hours, minutes, link }: Props) => {
  const router = useRouter();
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const textColor = isDarkMode ? "text-gray-300" : "text-gray-800";
  const subTextColor = isDarkMode ? "text-gray-400" : "text-gray-600";
  const cardBg = isDarkMode ? "bg-purple-800/20" : "bg-purple-400/30";
  const iconColor = isDarkMode ? "text-purple-300" : "text-purple-700";

  return (
    <article
      key={course._id}
      className={`w-full flex flex-col justify-between ${cardBg} p-5 rounded-xl shadow-md hover:scale-[1.01] transition-all cursor-pointer duration-200 delay-75`}
    >
      <div className="flex flex-col gap-2">
        <h1 className={`text-xl font-semibold ${textColor}`}>{course.title}</h1>
        <p className={`text-sm ${subTextColor}`}>
          {course.description.length > 200
            ? course.description.slice(0, 200) + "..."
            : course.description}
        </p>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3 mt-4 text-sm">
        <div className="flex items-center gap-4 text-sm">
          {/* Level */}
          <div className={`flex items-center gap-1 ${iconColor}`}>
            {course.level === "basic" ? (
              <BsFillTriangleFill className="text-green-500" />
            ) : (
              <FaSquare className="text-red-500" />
            )}
          </div>

          {/* Duration */}
          <div className={`flex items-center gap-1 ${iconColor}`}>
            <FaHourglassStart />
            {course.duration != null ? (
              <span className="text-sm">
                {hours === 0 ? "" : hours + " h : "} {minutes}m
              </span>
            ) : (
              "0"
            )}
          </div>

          {/* Lessons */}
          <div className={`flex items-center gap-1 ${iconColor}`}>
            <MdOutlineDiscount />
            <span>{course.modules.length}</span>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={() => router.push(link)}
          className="flex items-center gap-2 px-3 py-2 border border-purple-600 text-purple-700 rounded hover:bg-purple-600 hover:text-white active:scale-95 cursor-pointer transition duration-200 delay-100"
        >
          <FaPlay className="text-green-400" size={16} />
          <span className="hidden md:block">Play</span>
        </button>
      </div>
    </article>
  );
};

export default CourseCard;
