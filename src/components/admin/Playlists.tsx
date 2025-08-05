"use client";
import React from "react";
import { useAppSelector } from "@/app/hooks";
import PlaylistSkeleton from "./PlaylistSkeleton";
import CourseCard from "@/components/admin/CourseCard";

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

interface Prop {
  data: PlaylistType[];
  loading: boolean;
}

const Playlists = ({ data, loading }: Prop) => {
  const isDarkMode = useAppSelector((state) => state.theme.theme);

  return (
    <div
      className={`w-full px-4 py-6 rounded-xl transition-colors duration-300 ${
        isDarkMode ? " text-white" : "text-gray-900"
      }`}
    >
      {/* Loading state */}
      {loading ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <PlaylistSkeleton />
          <PlaylistSkeleton />
          <PlaylistSkeleton />
          <PlaylistSkeleton />
          <PlaylistSkeleton />
          <PlaylistSkeleton />
          <PlaylistSkeleton />
        </div>
      ) : (
        <CourseCard courses={data} />
      )}
    </div>
  );
};

export default Playlists;
