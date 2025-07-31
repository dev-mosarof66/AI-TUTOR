"use client";
import React from "react";
import { Gem, Triangle, PlayCircle } from "lucide-react";
import { FaHourglassStart } from "react-icons/fa";
import { FcStart } from "react-icons/fc";

// Sample lesson data
const courseContent = [
  {
    id: 1,
    title: "Introduction to Fullstack Development",
    duration: "8 min",
  },
  {
    id: 2,
    title: "HTML Basics",
    duration: "12 min",
  },
  {
    id: 3,
    title: "CSS Flexbox & Grid",
    duration: "20 min",
  },
  {
    id: 4,
    title: "JavaScript Fundamentals",
    duration: "35 min",
  },
  {
    id: 5,
    title: "Intro to React",
    duration: "42 min",
  },
  {
    id: 1,
    title: "Introduction to Fullstack Development",
    duration: "8 min",
  },
  {
    id: 2,
    title: "HTML Basics",
    duration: "12 min",
  },
  {
    id: 3,
    title: "CSS Flexbox & Grid",
    duration: "20 min",
  },
  {
    id: 4,
    title: "JavaScript Fundamentals",
    duration: "35 min",
  },
  {
    id: 5,
    title: "Intro to React",
    duration: "42 min",
  },
];

const Course = ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <p>{params.id}</p>
        <div className="p-4 xs:p-8 sm:p-10">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-400 leading-tight">
            The Fullstack Developer Path
          </h1>
          <p className="text-gray-500 text-sm sm:text-lg">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum
            illo optio excepturi, labore repudiandae libero laboriosam corporis!
            Quas, molestiae nostrum doloremque tempora labore, ipsa debitis
            cupiditate vel totam ipsam deserunt consequuntur exercitationem.
          </p>

          <div className="flex  gap-6 pt-6">
            <div className="flex items-center gap-1 bg-[#4ce0d165] p-1 rounded-sm">
              <FaHourglassStart className="text-amber-400" size={18} />
              <span className="text-gray-200 text-sm">106.4 hrs</span>
            </div>
            <div className="flex items-center gap-1 bg-[#4ce0d165] p-1 rounded-sm">
              <Triangle className="text-cyan-400" size={18} />
              <span className="text-gray-200 text-sm">Beginner</span>
            </div>
            <div className="flex items-center gap-1 bg-[#4ce0d165] p-1 rounded-sm">
              <Gem className="text-purple-400" size={19} />
              <span className="text-gray-200 text-sm">Pro</span>
            </div>
          </div>
          <div className="w-fit my-6 px-1 py-1 rounded-sm text-gray-300 flex items-center gap-1 bg-purple-500/40 cursor-pointer hover:ring-2 hover:ring-purple-600 active:ring-2 active:ring-purple-400 transition duration-300 delay-75">
            <FcStart size={19} color="gray" />
            <p className="text-sm sm:text-base">Start Learning</p>
          </div>
        </div>

        {/* Course Content */}
        <div className="w-[90%] max-w-5xl pb-6 mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Course Content
          </h2>
          <div className="space-y-4">
            {courseContent.map((lesson) => (
              <div
                key={lesson.id}
                className="flex items-center justify-between bg-[#334155] hover:bg-[#475569] transition duration-200 p-4 rounded-xl shadow-sm group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <PlayCircle className="text-green-400 group-hover:scale-105 transition duration-200" />
                  <p className="text-white text-sm sm:text-base font-medium">
                    {lesson.title}
                  </p>
                </div>
                <span className="text-gray-400 text-sm">{lesson.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
