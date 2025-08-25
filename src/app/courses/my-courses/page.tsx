"use client";
import { useAppSelector } from "@/app/hooks";
import CourseCard from "@/components/custom/CourseCard";
import { useRouter } from "next/navigation";
import React from "react";
import { FaSearch } from "react-icons/fa";

const MyCourses = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  console.log(user?.enrolledCourses);

  return (
    <div className="w-[96%] mx-auto">
      {(user?.enrolledCourses?.length ?? 0) > 0 ? (
        <div className="w-full my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user?.enrolledCourses.map((course) => {
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
      ) : (
        <div className="w-full flex flex-col justify-center items-center gap-6 py-10">
          <h2 className="text-purple-500/30 text-base sm:text-xl">
            You did not enroll in any courses yet.
          </h2>
          <button
            onClick={() => router.push("/courses")}
            className="flex items-center gap-2 border border-purple-600 hover:bg-purple-600 active:scale-[0.97] text-white font-semibold px-6 py-2 cursor-pointer transition-all duration-200 delay-75"
          >
            <FaSearch />
            Explore
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
