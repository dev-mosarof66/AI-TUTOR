/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAppSelector } from "@/app/hooks";
import AddPlaylist from "@/components/admin/AddPlaylist";
import PlayList from "@/components/admin/Playlists";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface ModuleType {
  title: string;
  comments: string[];
  videos: string[];
}

interface PlaylistType {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  duration: number | null;
  level: string | null;
  modules: ModuleType[];
  popular: boolean;
  __v: number;
}

const Playlists = () => {
  const AllCoursese_Store = useAppSelector(
    (state) => state.playlists.playlists
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [allCourses, setAllCourses] = useState<PlaylistType[]>(
    AllCoursese_Store || []
  );

  console.log(allCourses)

  const [searchingCourses, setSearchingCourses] = useState(false);
  console.log(searchTerm);
  const isDarkMode = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    const fetchAllCourses = async () => {
      setSearchingCourses(true);
      try {
        const res = await axios.get("/api/courses");
        console.log(res);
        setAllCourses(res?.data.data);
      } catch (error: any) {
        const status = error?.response?.status;
        if (status === 500) {
        }
      } finally {
        setSearchingCourses(false);
      }
    };
    fetchAllCourses();
  }, []);

  return (
    <div
      className={`w-full ${isDarkMode ? "text-gray-200" : "text-gray-800"} p-4`}
    >
      <div className="w-full border-b border-gray-500 pb-4">
        <AddPlaylist setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      </div>

      <div>
        <PlayList data={allCourses} loading={searchingCourses} />
      </div>
    </div>
  );
};

export default Playlists;
