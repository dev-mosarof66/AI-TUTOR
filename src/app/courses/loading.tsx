'use client'
import React from "react";
import { useAppSelector } from "../hooks";

const Loading = () => {
  const isDarkMode = useAppSelector(state=>state.theme.theme)
  return (
    <div
      className={`w-full h-screen flex flex-col items-center justify-center ${isDarkMode?'bg-gray-800 ':'bg-white'}
      `}
    >
      <span className="loading loading-ring text-primary loading-lg"></span>
    </div>
  );
};

export default Loading;
