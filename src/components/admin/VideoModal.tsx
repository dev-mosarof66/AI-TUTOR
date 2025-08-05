import React from "react";
import { motion } from "framer-motion";
import { Button, IconButton } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { FaPlus, FaVideo } from "react-icons/fa6";

interface Duration {
  hours: number;
  minutes: number;
  seconds: number;
}

interface VideoModalProps {
  isDarkMode: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  reset: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>; // this function returns nothing just call the backend api
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  submitting: boolean;
  handleVideoInput: React.ChangeEventHandler<HTMLInputElement>;
  videoFile?: File | null;
  duration: Duration;
  comments: string;
  setComments: React.Dispatch<React.SetStateAction<string>>;
}

const VideoModal = ({
  isDarkMode,
  setShowModal,
  reset,
  handleSubmit,
  title,
  setTitle,
  submitting,
  handleVideoInput,
  videoFile,
  duration,
  comments,
  setComments,
}: VideoModalProps) => {
  const baseBg = isDarkMode ? "bg-gray-900" : "bg-white";
  const cardBg = isDarkMode ? "bg-gray-800" : "bg-gray-100";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-300";
  const textColor = isDarkMode ? "text-gray-200" : "text-gray-800";
  const secondaryText = isDarkMode ? "text-gray-400" : "text-gray-600";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6 } }}
      className="fixed inset-0 z-50 backdrop-blur-xs flex items-center justify-center bg-black/50 px-4"
    >
      <div
        className={`w-full max-w-lg rounded-md shadow-md overflow-hidden ${baseBg} border ${borderColor}`}
      >
        <div className={`flex justify-end items-center px-6 py-4`}>
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

        <form onSubmit={handleSubmit} className="px-6 py-2 space-y-4">
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
              disabled={submitting}
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

          {/* NECESSARY LINKS GOES HEREE.. */}
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
              type="submit"
              color="secondary"
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
  );
};

export default VideoModal;
