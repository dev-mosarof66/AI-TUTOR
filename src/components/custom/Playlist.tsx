"use client";
import { useAppSelector } from "@/app/hooks";
import formatHMS from "@/helper/convertTime";
import React from "react";

interface PlaylistType {
  _id: string;
  title: string;
  video: string;
  createdAt: string;
  updatedAt: string;
  links: string;
  duration: number;
  __v: number;
}

interface PlaylistProps {
  data: PlaylistType[];
  currentVideoIndex: number;
  setCurrentVideoIndex: (val: number) => void;
}

const Playlist = ({
  data,
  currentVideoIndex,
  setCurrentVideoIndex,
}: PlaylistProps) => {
  const isDarkMode = useAppSelector((state) => state.theme.theme);

  return (
    <div className="w-full py-2 text-white grid grid-cols-1 gap-2">
      {data.length === 0 ? (
        <div className={`w-full h-full flex items-center justify-center`}>
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            No Modules Found
          </p>
        </div>
      ) : (
        data.map((item, index) => {
          const isRunning = item.title === data[currentVideoIndex]?.title;
          const { hours, minutes, seconds } = formatHMS(item?.duration);

          return (
            <div
              onClick={() => setCurrentVideoIndex(index)}
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
                {hours === 0 ? "" : hours + " h : "}{" "}
                {minutes === 0 ? "" : minutes + " m : "}
                {seconds === 0 ? "" : seconds + " s "}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Playlist;
