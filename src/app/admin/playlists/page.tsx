/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import AddPlaylist from "@/components/admin/AddPlaylist";
import PlayList from "@/components/admin/Playlists";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { updatePlaylist } from "@/features/playlist/playlists";

const Playlists = () => {
  const dispatch = useAppDispatch();
  const playlist = useAppSelector((state) => state.playlists.playlists);
  const [searchTerm, setSearchTerm] = useState("");

  const [searchingCourses, setSearchingCourses] = useState(false);
  console.log("inside the playlist page");
  const isDarkMode = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    const fetchAllCourses = async () => {
      setSearchingCourses(true);
      try {
        const res = await axios.get("/api/courses");
        dispatch(updatePlaylist(res?.data.data));
      } catch (error: any) {
        const status = error?.response?.status;
        if (status === 500) {
        }
      } finally {
        setSearchingCourses(false);
      }
    };
    fetchAllCourses();
  }, [dispatch]);

  return (
    <div
      className={`w-full ${isDarkMode ? "text-gray-200" : "text-gray-800"} p-4`}
    >
      <div className="w-full border-b border-gray-500 pb-4">
        <AddPlaylist setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      </div>

      <div>
        <PlayList data={playlist} loading={searchingCourses} />
      </div>
    </div>
  );
};

export default Playlists;
