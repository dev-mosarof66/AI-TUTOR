"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import AddPlaylist from "@/components/admin/AddPlaylist";
import PlayList from "@/components/admin/Playlists";
import React, { useEffect, useState } from "react";
import { getAllPlaylist } from "@/features/playlist/playlists";

const Playlists = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { playlists, loading } = useAppSelector((state) => state.playlists);

  console.log("inside the playlist page");
  const isDarkMode = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    dispatch(getAllPlaylist());
  }, [dispatch]);

  return (
    <div
      className={`w-full ${isDarkMode ? "text-gray-200" : "text-gray-800"} p-4`}
    >
      <div className="w-full border-b border-gray-500 pb-4">
        <AddPlaylist setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      </div>

      <div>
        <PlayList data={playlists} loading={loading} />
      </div>
    </div>
  );
};

export default Playlists;
