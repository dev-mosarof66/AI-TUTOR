/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, ChangeEvent, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import "../../css/sidebar.css";
import { toast } from "react-hot-toast";
import formatHMS from "@/helper/convertTime";
import { addModule, getAllModules } from "@/features/moudles/modules";
import VideoModal from "./VideoModal";
import { FaPlus, FaDeleteLeft } from "react-icons/fa6";
import { Button } from "@mui/material";
import { deletePlaylist } from "@/features/playlist/playlists";
import { useRouter } from "next/navigation";

interface AddModuleProps {
  playlistId: string;
}

interface DeleteModalProps {
  onConfirm: () => void;
  onClose: () => void;
  isDarkMode: boolean;
}

const AddModule: React.FC<AddModuleProps> = ({ playlistId }) => {
  const router = useRouter()
  console.log("inside the add modules page");
  const dispatch = useAppDispatch();
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
  const [deleteModal, setDeleteModal] = useState(false);
  const { playlists } = useAppSelector((state) => state.playlists);
  console.log(playlists);

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

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!videoFile) {
      toast.error("Provide a video file");
      return;
    }

    const totalSeconds =
      duration.hours * 3600 + duration.minutes * 60 + duration.seconds;

    if (totalSeconds <= 0) {
      toast.error("Invalid duration");
      return;
    }

    setSubmitting(true);
    try {
      dispatch(
        addModule({
          playlistId,
          title: title.trim(),
          durationSeconds: totalSeconds,
          comments: comments.trim(),
          videoFile,
        })
      );

      reset();
    } catch (err: any) {
      toast.error(
        typeof err === "string" ? err : err?.message || "Failed to add module",
        { position: "top-right" }
      );
      console.error("Add module error:", err);
    } finally {
      setSubmitting(false);
      setShowModal(false);
      dispatch(getAllModules(playlistId));
    }
  };

  const handlePlaylistDelete = async () => {
    dispatch(deletePlaylist(playlistId));
    setDeleteModal(false)
    router.push('/admin/playlists')
  };

  return (
    <>
      <div className="w-full flex items-center justify-end px-6 py-4 xs:px-10">
        <div
          className={`w-full flex flex-row-reverse items-center justify-between`}
        >
          <div
            onClick={() => setDeleteModal(true)}
            className={`flex items-center gap-3 ${
              isDarkMode ? "bg-purple-600/20" : "bg-purple-500/20"
            } p-1 px-4 rounded-lg hover:brightness-105 active:ring active:ring-green-500 transition duration-300 cursor-pointer z-50 relative`}
          >
            <FaDeleteLeft size={20} className="text-red-500" />
            <p className="hidden xs:block">Drop</p>
          </div>
          <div
            onClick={() => setShowModal(true)}
            className={`flex items-center gap-2 ${
              isDarkMode ? "bg-purple-600/20" : "bg-purple-500/20"
            } p-1 px-4 rounded-lg hover:brightness-105 active:ring active:ring-green-500 transition duration-300 cursor-pointer z-50 relative`}
          >
            <FaPlus />
            <p className="hidden xs:block">Module</p>
          </div>
        </div>
      </div>

      {showModal && (
        <VideoModal
          isDarkMode={isDarkMode}
          setShowModal={setShowModal}
          reset={reset}
          handleSubmit={handleSubmit}
          title={title}
          setTitle={setTitle}
          submitting={submitting}
          handleVideoInput={handleVideoInput}
          videoFile={videoFile}
          duration={duration}
          comments={comments}
          setComments={setComments}
        />
      )}

      {deleteModal && (
        <DeleteModal
          isDarkMode={isDarkMode}
          onConfirm={handlePlaylistDelete}
          onClose={() => setDeleteModal(false)}
        />
      )}
    </>
  );
};

export const DeleteModal = ({
  onConfirm,
  onClose,
  isDarkMode,
}: DeleteModalProps) => {
  return (
    <div
      className="w-full h-screen fixed top-0 left-0 z-50 backdrop-blur-xs flex flex-col items-center justify-center"
    >
      <div
        className={`${
          isDarkMode ? "bg-gray-700 text-gray-100" : "bg-white"
        } p-3 sm:p-4 py-6 rounded-sm flex flex-col gap-6`}
      >
        <div
          className={`${isDarkMode ? "bg-gray-700 text-gray-100" : "bg-white"}`}
        >
          <h1>Are you sure you want to drop this playlist?</h1>
        </div>
        <div className="w-full flex items-center justify-end gap-4">
          <Button onClick={onClose}>Cancel</Button>
          <Button color="primary" variant="contained" onClick={onConfirm}>
            Drop
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddModule;
