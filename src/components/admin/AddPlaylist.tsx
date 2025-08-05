/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { Button, IconButton } from "@mui/material";
import React, { useState, useEffect, ChangeEvent } from "react";
import { FaSearch, FaTimes, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import "../../css/sidebar.css";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { createPlaylist, getAllPlaylist } from "@/features/playlist/playlists";
import { toast } from "react-hot-toast";
import { FaSquare } from "react-icons/fa6";
import { BsTriangleFill } from "react-icons/bs";

interface PlaylistProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

type CategoryType = "basic" | "advance";

const categoryOptions: {
  value: CategoryType;
  label: string;
  Icon: React.ElementType;
}[] = [
  { value: "basic", label: "Basic", Icon: BsTriangleFill },
  { value: "advance", label: "Advance", Icon: FaSquare },
];

const AddPlaylist = ({ searchTerm, setSearchTerm }: PlaylistProps) => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const [searchModal, setSearchModal] = useState(false);
  const [showPlaylistModal, setPlaylistModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [playlist, setPlaylist] = useState<{
    title: string;
    description: string;
    thumbnail: File | null;
    category: string;
  }>({
    title: "",
    description: "",
    thumbnail: null,
    category: "basic",
  });

  console.log("inside the add playlist");
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

  // prevent background scroll when modal open
  useEffect(() => {
    if (searchModal || showPlaylistModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchModal, showPlaylistModal]);

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

  const handleCreatePlaylist = async () => {
    if (!playlist.title.trim() || !playlist.thumbnail) {
      toast.error("Title and thumbnail are mandatory", {
        position: "bottom-right",
        duration: 4000,
      });
      return;
    }

    setLoading(true);
    try {
      const { title, description, thumbnail, category } = playlist;
      await dispatch(
        createPlaylist({
          title: title.trim(),
          description: description.trim(),
          thumbnail: thumbnail!,
          category,
        })
      ).unwrap();

      toast.success("Playlist created successfully", { position: "top-right" });
      setPlaylist({
        title: "",
        description: "",
        thumbnail: null,
        category: "basic",
      });
      setPlaylistModal(false);
      dispatch(getAllPlaylist());
    } catch (err: any) {
      toast.error(err || "Failed to create playlist", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = () => {
    // optional: trigger search if needed
  };

  return (
    <div className="w-full sm:w-[95%] mx-auto flex items-center justify-between px-4 sm:p-0">
      {/* Search Icon */}
      <div className=" flex items-center gap-3">
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
            <span className="hidden md:block">Playlist</span>
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
                <div className="border border-gray-300 py-2 px-4 rounded-sm h-32 scrollbar-hidden">
                  <textarea
                    name="description"
                    placeholder="Playlist Description"
                    value={playlist.description}
                    onChange={handleChange}
                    className={`w-full h-full resize-none  scrollbar-hidden bg-transparent outline-none ${
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

                {/* Category selection */}
                <div className="w-full flex items-center gap-3">
                  <h2 className="text-sm sm:text-base text-gray-500">
                    Course Category:
                  </h2>
                  <div className="flex gap-4">
                    {categoryOptions.map(({ value, label, Icon }) => (
                      <div
                        key={value}
                        role="button"
                        onClick={() => handleChange}
                        className={`flex items-center gap-2 p-1 rounded-md border cursor-pointer transition ${
                          playlist.category === value
                            ? "bg-purple-500/30 border-purple-500"
                            : "border-gray-300"
                        }`}
                      >
                        <Icon
                          className={`text-sm sm:text-base ${
                            playlist.category === value
                              ? "text-purple-700"
                              : "text-gray-500"
                          }`}
                        />
                        <p className="capitalize hidden sm:block text-sm">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={handleCreatePlaylist}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <span className="loading loading-spinner text-white"></span>
                      Uploading{" "}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <FaPlus /> Upload Module
                    </div>
                  )}
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
