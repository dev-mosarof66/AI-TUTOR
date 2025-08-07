"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeTheme } from "@/features/theme/themeSlice";
import VideoPlayer from "@/components/custom/VideoPlayer";
import CourseDescription from "@/components/custom/CourseDescription";
import { MdKeyboardArrowUp } from "react-icons/md";
import Playlist from "@/components/custom/Playlist";
import { useParams } from "next/navigation";
import { getAllModules } from "@/features/moudles/modules";

const CourseLayout = () => {
  const params = useParams<{ slug: string }>();
  const playlistId = params?.slug;
  const { modules, loading } = useAppSelector((state) => state.modules);
  const { playlists } = useAppSelector((state) => state.playlists);
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();
  const [fullPlaylist, setFullPlaylist] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);

  console.log(modules);
  console.log(playlists);

  useEffect(() => {
    const load = localStorage.getItem("p_xyz");
    const theme = load ? JSON.parse(load) : null;
    dispatch(changeTheme(theme));
    if (playlistId) dispatch(getAllModules(playlistId));
  }, [dispatch, playlistId]);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center">
        <span className="loading loading-ring loading-xl text-primary"></span>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* small screen  */}
      <div className=" w-[96%] sm:w-[90%] mx-auto grid grid-cols-1 lg:hidden gap-6 relative">
        <div className="w-full mx-auto flex items-center justify-center">
          <VideoPlayer
            currentVideoIndex={currentVideoIndex}
            setCurrentVideoIndex={setCurrentVideoIndex}
          />
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
                {modules[currentVideoIndex]
                  ? modules[currentVideoIndex].title.length > 30
                    ? modules[currentVideoIndex].title.slice(0, 30) + "..."
                    : modules[currentVideoIndex].title
                  : ""}
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
                data={modules}
                currentVideoIndex={currentVideoIndex}
                setCurrentVideoIndex={setCurrentVideoIndex}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-5">
          <CourseDescription
            currentVideoIndex={currentVideoIndex}
            params={params ? params?.slug : null}
            playlists={playlists}
          />
        </div>
      </div>
      {/* larger screen */}
      <div className=" w-[90%]  mx-auto hidden lg:flex lg:flex-row">
        <div className="w-[70%] grid grid-cols-1 gap-6">
          <div className="w-full">
            <VideoPlayer
              currentVideoIndex={currentVideoIndex}
              setCurrentVideoIndex={setCurrentVideoIndex}
            />
          </div>
          <div className="w-full mx-auto flex flex-col gap-5">
            <CourseDescription
              params={params ? params?.slug : null}
              currentVideoIndex={currentVideoIndex}
              playlists={playlists}
            />
          </div>
        </div>
        <div className="flex-1 fixed right-10 w-[28%] h-[80vh] overflow-y-scroll bg-purple-400/20 p-3 rounded-sm shadow shadow-black">
          <Playlist
            data={modules}
            currentVideoIndex={currentVideoIndex}
            setCurrentVideoIndex={setCurrentVideoIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseLayout;
