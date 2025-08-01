/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, FormEvent, ChangeEvent, useRef } from "react";
import { useAppSelector } from "@/app/hooks";
import { Button, IconButton } from "@mui/material";
import { FaPlus, FaTimes } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { motion } from "framer-motion";
import "../../css/sidebar.css";
import { toast } from "react-hot-toast";
import axios from "axios";
import formatHMS from "@/helper/convertTime";

interface AddModuleProps {
  playlistId: string;
  onSuccess?: (module: any) => void;
}

const AddModule: React.FC<AddModuleProps> = ({ playlistId, onSuccess }) => {
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [comments, setComments] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setTitle("");
    setDuration({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    setVideoFile(null);
    setComments("");
  };

  const handleVideoInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    setVideoFile(file);

    if (!videoRef.current) {
      const vid = document.createElement("video");
      vid.preload = "metadata";
      videoRef.current = vid;
    }
    const url = URL.createObjectURL(file);
    const vidEl = videoRef.current;

    const onLoaded = () => {
      const durationSec = vidEl.duration || 0;
      const time = formatHMS(durationSec);
      setDuration({
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds,
      });
      URL.revokeObjectURL(url);
      vidEl.removeEventListener("loadedmetadata", onLoaded);
    };

    vidEl.addEventListener("loadedmetadata", onLoaded);
    vidEl.src = url;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    const totalSeconds =
      duration.hours * 3600 + duration.minutes * 60 + duration.seconds;
    if (totalSeconds <= 0) {
      toast.error("Invalid duration");
      return;
    }

    if (!videoFile) {
      toast.error("Provide a video file");
      return;
    }

    setSubmitting(true);
    const form = new FormData();
    form.append("title", title.trim());
    form.append("duration", totalSeconds.toString());
    form.append("comments", comments.trim());
    form.append("video", videoFile);

    try {
      const res = await axios.post(
        `/api/courses/modules/create/${playlistId}`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Module added", { position: "top-center" });
      onSuccess?.(res.data?.data || null);
      reset();
      setShowModal(false);
    } catch (err: any) {
      console.error("Add module error:", err);
      toast.error(err?.response?.data?.message || "Failed to add module", {
        position: "top-right",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const baseBg = isDarkMode ? "bg-gray-900" : "bg-white";
  const cardBg = isDarkMode ? "bg-gray-800" : "bg-gray-100";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-300";
  const textColor = isDarkMode ? "text-gray-200" : "text-gray-800";
  const secondaryText = isDarkMode ? "text-gray-400" : "text-gray-600";

  return (
    <>
      <div className="w-full flex items-center justify-end px-6 py-4 xs:px-10">
        <div
          onClick={() => setShowModal(true)}
          className={`flex items-center gap-2 ${
            isDarkMode ? "bg-purple-600/20" : "bg-purple-500/20"
          } p-1 px-4 rounded-lg hover:brightness-105 active:ring active:ring-green-500 transition duration-300 cursor-pointer z-50 relative`}
        >
          <FaPlus />
          <p className="block xs:hidden">Add</p>
          <p className="hidden xs:block">Add Module</p>
        </div>
      </div>

      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 backdrop-blur-xs flex items-center justify-center bg-black/50 px-4"
        >
          <div
            className={`w-full max-w-lg rounded-md shadow-md overflow-hidden ${baseBg} border ${borderColor}`}
          >
            <div
              className={`flex justify-end items-center px-6 py-4 border-b ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <IconButton
                size="small"
                onClick={() => {
                  setShowModal(false);
                  reset();
                }}
              >
                <FaTimes className={textColor} />
              </IconButton>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
              {/* Title */}
              <div className={`w-full`}>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter module title"
                  className={`w-full border rounded px-3 py-2 outline-none focus:ring focus:ring-purple-500 ${cardBg} ${borderColor} ${textColor}`}
                  disabled={submitting}
                  required
                />
              </div>

              {/* Video Upload */}
              <div className="relative flex flex-col items-center justify-center border border-dashed border-gray-400 rounded-md p-4 py-8">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoInput}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <FaVideo className="text-4xl text-purple-400" />
                <span className="text-sm mt-2 text-gray-500">
                  {videoFile?.name || "Choose Module"}
                </span>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2">
                <p className={`text-sm font-medium ${textColor}`}>
                  Module Duration :
                </p>
                <div className={`text-sm ${secondaryText}`}>
                  {duration.hours}h {duration.minutes}m {duration.seconds}s
                </div>
              </div>

              {/* Comments */}
              <div className="flex flex-col gap-1">
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="If any links for this module"
                  className={`w-full border rounded px-3 py-2 outline-none resize-none focus:ring focus:ring-purple-500 ${cardBg} ${borderColor} ${textColor}`}
                  rows={3}
                  disabled={submitting}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-2 pt-2">
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2"
                >
                  {submitting ? (
                    <div className="flex items-center gap-2 text-white">
                      <span className="loading loading-sm loading-spinner text-primary"></span>
                      Uploading{" "}
                    </div>
                  ) : (
                    <>
                      <FaPlus /> Upload Module
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default AddModule;
