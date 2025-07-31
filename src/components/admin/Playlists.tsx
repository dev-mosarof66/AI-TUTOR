"use client";
import React from "react";
import Image from "next/image";
import { useAppSelector } from "@/app/hooks";
import PlaylistSkeleton from "./PlaylistSkeleton";

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
      className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full mx-auto px-4 py-6 rounded-xl transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Loading state */}
      {loading ? (
        <div>
          <PlaylistSkeleton />
          <PlaylistSkeleton />
          <PlaylistSkeleton />
          <PlaylistSkeleton />
        </div>
      ) : data.length > 0 ? (
        data.map((item) => (
          <div
            key={item._id}
            className={`flex flex-col  gap-6 p-2 rounded-lg shadow-md transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {/* Thumbnail */}
            <div className="relative w-full md:w-[100%] mx-auto lg:w-full  h-48 rounded-lg overflow-hidden shadow-sm">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="transition duration-300 delay-75"
              />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold mb-1">{item.title}</h2>
                <p className="text-sm mb-2 line-clamp-3">{item.description}</p>
                <div className="text-xs opacity-80 mb-2">
                  <span>Level: {item.level ?? "N/A"}</span> •{" "}
                  <span>
                    Duration: {item.duration ? `${item.duration} hrs` : "N/A"}
                  </span>
                </div>

                {item.popular && (
                  <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                    🔥 Popular
                  </span>
                )}
              </div>

              {/* Modules */}
              {item.modules.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold mb-1">
                    Modules ({item.modules.length})
                  </h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {item.modules.map((mod, idx) => (
                      <li key={idx}>
                        <strong>{mod.title}</strong> – {mod.videos.length} video
                        {mod.videos.length !== 1 ? "s" : ""},{" "}
                        {mod.comments.length} comment
                        {mod.comments.length !== 1 ? "s" : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-lg font-medium">No playlists found.</p>
      )}
    </div>
  );
};

export default Playlists;
