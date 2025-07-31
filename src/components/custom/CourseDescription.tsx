import { useAppSelector } from "@/app/hooks";
import React from "react";
import Comments from "./Comments";

type CourseDescriptionProps = {
  title: string;
};

const CourseDescription: React.FC<CourseDescriptionProps> = ({ title }) => {
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  return (
    <div className="w-[100%] lg:w-[90%] flex flex-col gap-4 px-2 sm:px-0">
      <h1
        className={`text-xl xs:text-2xl lg:text-3xl ${
          isDarkMode ? "text-gray-300" : ""
        }`}
      >
        {title} | Web Development Crash Course 1.0
      </h1>
      <div className="w-full h-[1px] bg-green-600/40" />
      <div>
        <Comments />
      </div>
    </div>
  );
};

export default CourseDescription;
