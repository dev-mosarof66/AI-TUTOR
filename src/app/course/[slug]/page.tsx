"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeTheme } from "@/features/theme/themeSlice";
import VideoPlayer from "@/components/custom/VideoPlayer";
import CourseDescription from "@/components/custom/CourseDescription";
import { MdKeyboardArrowUp } from "react-icons/md";
import { webDevPlaylist } from "@/data";
import Playlist from "@/components/custom/Playlist";
import { useParams } from "next/navigation";

interface PlaylistType {
  title: string;
  duration: number | string;
  link: string;
}

const CourseLayout = () => {
  const params =  useParams<{slug:string}>()
  console.log(params?.slug)
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();
  const [fullPlaylist, setFullPlaylist] = useState(false);
  const [runningVideo, setRunningVideo] = useState<PlaylistType>(webDevPlaylist[0]);
  useEffect(() => {
    const load = localStorage.getItem("p_xyz");
    const theme = load ? JSON.parse(load) : null;
    dispatch(changeTheme(theme));
  }, [dispatch]);

  return (
    <div>
      {/* small screen  */}
      <div className="flex-1 w-[96%] sm:w-[90%] mx-auto grid grid-cols-1 lg:hidden gap-6 relative">
        <div className="w-full mx-auto flex items-center justify-center">
          <VideoPlayer  />
          {/* <VideoPlayer source={runningVideo.link} /> */}
        </div>

        {/* playlist goes here  */}
        <div className="w-full  backdrop-blur-2xl fixed bottom-4 right-0 z-50">
          <div
            onClick={() => setFullPlaylist(!fullPlaylist)}
            className={`w-[90%] mx-auto flex ${
              isDarkMode
                ? " bg-green-500/30  hover:bg-green-500/20 active:ring active:ring-purple-500/50"
                : " bg-green-900  hover:bg-green-90/90 active:ring active:ring-purple-100"
            } items-center justify-between rounded-sm p-2 py-3 cursor-pointer transition duration-300 delay-75`}
          >
            <div>
              <h1
                className={`${
                  isDarkMode ? "text-purple-500" : "text-gray-200"
                }`}
              >
                {runningVideo.title.length > 30
                  ? runningVideo.title.slice(0, 30) + "..."
                  : runningVideo.title}
              </h1>
            </div>
            <div
              className={`${fullPlaylist ? "rotate-180" : ""} ${
                isDarkMode ? "text-purple-500" : "text-gray-200"
              }`}
            >
              <MdKeyboardArrowUp size={30} />
            </div>
          </div>
          {fullPlaylist && (
            <div className="w-[90%]  mx-auto h-96 overflow-y-scroll transition duration-300 delay-75">
              <Playlist
                data={webDevPlaylist}
                runningVideo={runningVideo}
                setRunningVideo={setRunningVideo}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-5">
          <CourseDescription title={runningVideo.title} />
        </div>
      </div>
      {/* larger screen */}
      <div className="flex-1 w-[90%]  mx-auto hidden lg:flex lg:flex-row">
        <div className="w-[70%] grid grid-cols-1 gap-6">
          <div className="w-full">
            <VideoPlayer  />
            {/* <VideoPlayer source={runningVideo.link} /> */}
          </div>
          <div className="w-full mx-auto flex flex-col gap-5">
            <CourseDescription title={runningVideo.title} />
          </div>
        </div>
        <div className="flex-1 fixed right-10 w-[28%] h-[80vh] overflow-y-scroll bg-purple-400/20 p-3 rounded-sm shadow shadow-black">
          <Playlist
            data={webDevPlaylist}
            runningVideo={runningVideo}
            setRunningVideo={setRunningVideo}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseLayout;
