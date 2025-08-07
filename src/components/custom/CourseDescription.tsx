"use client";
import { useAppSelector } from "@/app/hooks";
import React, { useEffect, useState } from "react";
import { Playlist } from "@/features/playlist/playlists";
import axios from "axios";

type CourseDescriptionProps = {
  params: string | null;
  currentVideoIndex: number;
  playlists: Playlist[];
};

const CourseDescription: React.FC<CourseDescriptionProps> = ({
  params,
  currentVideoIndex,
  playlists,
}) => {
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const [runningPlaylist, setRunningPlaylist] = useState<Playlist>();
  const { modules } = useAppSelector((state) => state.modules);

  useEffect(() => {
    if (params) {
      const handlePlalist = async () => {
        try {
          const res = await axios.get(`/api/playlists/${params}`);
          console.log(res.data.data);
          setRunningPlaylist(res.data.data);
        } catch (error) {
          console.log(
            "error in course description while fetching data for this playlist.",
            error
          );
        }
      };
      handlePlalist();
    }
  }, [params, playlists]);

  return (
    <div className="w-[100%] lg:w-[90%] flex flex-col gap-4 px-2 sm:px-0">
      <h1
        className={`text-xl xs:text-2xl lg:text-3xl ${
          isDarkMode ? "text-gray-300" : ""
        }`}
      >
        {modules[currentVideoIndex]?.title}{" "}
        {runningPlaylist?.title !== "" && "| " + runningPlaylist?.title}
      </h1>
      <div className="w-full h-[1px] bg-green-600/40" />
    </div>
  );
};

export default CourseDescription;
