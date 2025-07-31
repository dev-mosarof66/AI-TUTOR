/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { Button, IconButton } from "@mui/material";
import React, { useState, useEffect, ChangeEvent } from "react";
import { FaSearch, FaTimes, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import "../../css/sidebar.css";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { addPlaylist } from "@/features/playlist/playlists";
import { toast } from "react-hot-toast";
import axios from "axios";

interface PlaylistProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const AddPlaylist = ({ searchTerm, setSearchTerm }: PlaylistProps) => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  // const AllPlaylist = useAppSelector((state) => state.playlists.playlists);
  const [searchModal, setSearchModal] = useState(false);
  const [showPlaylistModal, setPlaylistModal] = useState(false);
  const [playlistLoading, setPlaylistLoading] = useState(false);

  const [playlist, setPlaylist] = useState<{
    title: string;
    description: string;
    thumbnail: File | null;
  }>({
    title: "",
    description: "",
    thumbnail: null,
  });

  // Escape key closes modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchModal(false);
        setPlaylistModal(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Input handlers
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPlaylist((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPlaylist((prev) => ({ ...prev, thumbnail: file }));
    }
  };

  // handle new playlist

  const handleCreatePlaylist = async () => {
    setPlaylistLoading(true);
    if (!playlist.title || !playlist.thumbnail) {
      toast.error("title and thumbnail are mandatory", {
        position: "bottom-right",
        duration: 4000,
      });
      setPlaylistLoading(false);
      return;
    }

    // call the api

    const formData = new FormData();
    formData.append("title", playlist.title);
    formData.append("description", playlist.description);
    formData.append("thumbnail", playlist.thumbnail);

    try {
      const res = await axios.post("/api/courses/create-playlist", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data);
      dispatch(addPlaylist(res?.data.data));
      // Reset modal and form
      setPlaylistModal(false);
      setPlaylist({ title: "", description: "", thumbnail: null });
      toast.success(res?.data.message, {
        position: "top-center",
      });
    } catch (error: any) {
      console.error("Error in add playlist:", error?.response);

      const status = error.response.status;

      if (status === 401) {
        toast.error("Unauthorized: Please log in again.", {
          position: "top-right",
        });
      } else if (status === 402) {
        toast.error("Payment Required: Upgrade your plan to continue.", {
          position: "top-right",
        });
      } else if (status === 500) {
        toast.error("Server error: Something went wrong!", {
          position: "top-right",
        });
      } else {
        toast.error("Unexpected error occurred. Try again.", {
          position: "top-right",
        });
      }
    } finally {
      setPlaylistLoading(false);
    }
  };

  const handleSearch = () => {};

  return (
    <div className="w-full sm:w-[90%] mx-auto flex items-center justify-between px-4 sm:p-0">
      {/* Search Icon */}
      <div className="flex items-center gap-3">
        <div className="block md:hidden">
          <IconButton color="secondary" onClick={() => setSearchModal(true)}>
            <FaSearch className="text-xl" />
          </IconButton>
        </div>

        <div
          onClick={handleSearch}
          className="w-xs hidden md:flex items-center gap-2 border border-gray-500 py-2 px-2 rounded-sm"
        >
          <FaSearch className="text-xl text-gray-400" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            className="outline-none w-full text-gray-400"
            placeholder="Search by playlist"
          />
        </div>

        {/* Search Modal */}
        {searchModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed top-0 left-0 w-full h-screen backdrop-blur-2xl flex items-center justify-center z-50"
          >
            <div
              className={`w-[90%] sm:w-lg h-96 bg-purple-500/40 p-4 rounded-sm border ${
                isDarkMode
                  ? "border-gray-600 text-gray-200"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              <div className="w-full flex items-center gap-2 border border-green-500 py-2 px-4 rounded-sm">
                <FaSearch className="text-xl" />
                <input
                  type="text"
                  placeholder="Search by playlist"
                  className="w-full outline-none bg-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <IconButton
                  color="secondary"
                  onClick={() => setSearchModal(false)}
                >
                  <FaTimes className="text-xl" />
                </IconButton>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Add Playlist Button */}
      <div>
        <div
          onClick={() => setPlaylistModal(true)}
          className={`flex flex-col items-center justify-center gap-2 cursor-pointer px-4 py-1 rounded-lg transition duration-300 ${
            isDarkMode
              ? "bg-purple-500/20 text-gray-400 hover:bg-purple-500/30"
              : "bg-green-500/20 text-gray-600 hover:bg-green-500/30"
          }`}
        >
          <div className="flex items-center gap-1">
            <FaPlus />
            <h2 className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
              New
            </h2>
          </div>
        </div>

        {/* Playlist Modal */}
        {showPlaylistModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed top-0 left-0 w-full h-screen backdrop-blur-sm flex items-center justify-center z-50 rounded-sm"
          >
            <div
              className={`w-full sm:w-lg max-h-[90vh] overflow-y-auto scrollbar-hidden rounded-md p-4 shadow-md ${
                isDarkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <div className="w-full flex justify-end mb-2">
                <Button
                  color="secondary"
                  size="small"
                  onClick={() => setPlaylistModal(false)}
                >
                  <span className={isDarkMode ? "" : "text-gray-600"}>esc</span>
                </Button>
              </div>

              {/* Playlist Form */}
              <div className="flex flex-col gap-5">
                {/* Title */}
                <div className="border border-gray-300 py-2 px-4 rounded-sm">
                  <input
                    name="title"
                    type="text"
                    placeholder="Playlist Title"
                    value={playlist.title}
                    onChange={handleChange}
                    className={`w-full bg-transparent outline-none ${
                      isDarkMode ? "text-green-300" : "text-gray-800"
                    }`}
                  />
                </div>

                {/* Description */}
                <div className="border border-gray-300 py-2 px-4 rounded-sm h-32">
                  <textarea
                    name="description"
                    placeholder="Playlist Description"
                    value={playlist.description}
                    onChange={handleChange}
                    className={`w-full h-full resize-none bg-transparent outline-none ${
                      isDarkMode ? "text-green-300" : "text-gray-800"
                    }`}
                  />
                </div>

                {/* Thumbnail Upload */}
                <div className="relative flex flex-col items-center justify-center border border-dashed border-gray-400 rounded-md p-4 py-8">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <MdPhotoSizeSelectActual className="text-4xl text-purple-400" />
                  <span className="text-sm mt-2 text-gray-500">
                    {playlist.thumbnail?.name || "Choose Playlist Thumbnail"}
                  </span>
                </div>

                {/* Submit button */}

                <Button
                  loading={playlistLoading}
                  variant="contained"
                  color="success"
                  fullWidth
                  startIcon={!playlistLoading && <FaPlus />}
                  onClick={() => handleCreatePlaylist()}
                >
                  {playlistLoading ? "processing" : "New Playlist"}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AddPlaylist;
