"use client";
import { useAppSelector } from "@/app/hooks";
import React from "react";

interface PlaylistType {
  title: string;
  duration: number | string;
  link: string;
}

interface PlaylistProps {
  data: PlaylistType[];
  runningVideo: PlaylistType;
  setRunningVideo: (video: PlaylistType) => void;
}

const Playlist = ({ data, runningVideo, setRunningVideo }: PlaylistProps) => {
  const isDarkMode = useAppSelector((state) => state.theme.theme);

  return (
    <div className="w-full py-2 text-white grid grid-cols-1 gap-2">
      {data.map((item, index) => {
        const isRunning = item.title === runningVideo.title;

        return (
          <div
            onClick={() => setRunningVideo(item)}
            key={index}
            className={`w-full flex items-center justify-between px-6 ${
              isRunning
                ? "bg-green-700 lg:text-gray-700"
                : "bg-green-600 lg:text-gray-700 hover:bg-green-600/80 active:ring active:ring-purple-600"
            } cursor-pointer transition duration-300 delay-75 py-2 rounded-sm`}
          >
            <h2
              className={`${
                isDarkMode
                  ? "text-gray-200"
                  : `${isRunning ? "text-gray-200" : "text-gray-300"}`
              } text-sm`}
            >
              {item.title.length > 30
                ? item.title.slice(0, 30) + "..."
                : item.title}
            </h2>
            <p
              className={`${
                isDarkMode ? "text-gray-300" : "text-gray-300"
              } text-sm`}
            >
              {item.duration}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Playlist;
