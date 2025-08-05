import { Button } from "@mui/material";
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  FormEvent,
} from "react";
import { FaPause, FaPlay, FaDeleteLeft } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import EditVideoModal from "./VideoModal";
import { useAppDispatch } from "@/app/hooks";
import formatHMS from "@/helper/convertTime";
import toast from "react-hot-toast";
import { deleteModule, updateModule } from "@/features/moudles/modules";
import { motion } from "framer-motion";

interface ModuleType {
  _id: string;
  title: string;
  duration: number;
  video: string;
  comments?: string;
  links: string;
}

interface CardProps {
  mod: ModuleType;
  isDarkMode: boolean;
  onEdit?: (updated: Partial<ModuleType>) => void;
  onDelete?: (id: string) => void;
  playlistId: string;
}

const formatDuration = (seconds: number) => {
  if (seconds < 0) return "—";
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hrs) return `${hrs}h ${mins}m`;
  if (mins) return `${mins}m ${secs}s`;
  return `${secs}s`;
};

const Card = ({ mod, isDarkMode, playlistId }: CardProps) => {
  const dispatch = useAppDispatch();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editableTitle, setEditableTitle] = useState(mod.title);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [links, setLinks] = useState(mod.links);
  const [submitting, setSubmitting] = useState(false);
  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  };
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleClick = () => {
    setShowModal(true);
  };

  console.log("inside the add modules page");
  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const reset = () => {
    setEditableTitle("");
    setDuration({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    setVideoFile(null);
    setLinks("");
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

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!editableTitle.trim()) {
      toast.error("Title is required");
      return;
    }

    setSubmitting(true);

    const totalSeconds =
      duration.hours * 3600 + duration.minutes * 60 + duration.seconds;

    const newVideoFile = videoFile ? videoFile : "";
    const newDuration = videoFile
      ? totalSeconds.toString()
      : mod.duration.toString();
    const form = new FormData();
    form.append("title", editableTitle.trim());
    form.append("duration", newDuration);
    form.append("links", links.trim());
    form.append("video", newVideoFile);

    dispatch(updateModule({ moduleId: mod._id, updates: form, playlistId }));
    setSubmitting(false);
  };

  const handleDeleteConfirm = async () => {
    dispatch(deleteModule({ moduleId: mod._id, playlistId }));
  };

  return (
    <>
      <div
        key={mod._id}
        className={`p-4 rounded-lg shadow transition border ${
          isDarkMode
            ? "bg-gray-800 border-gray-700 text-gray-100"
            : "bg-white border-gray-200 text-gray-800"
        } hover:scale-[1.01] duration-150`}
      >
        <div
          className="relative cursor-pointer overflow-hidden rounded-md group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          aria-label={`Open video player for ${mod.title}`}
        >
          <video
            ref={videoRef}
            className="w-full aspect-video object-cover rounded-md"
            src={mod.video}
            preload="metadata"
            playsInline
            controls={false}
          />
        </div>
        <div>
          <div className="flex justify-between items-start py-2">
            <div>
              <h2 className="text-base sm:text-lg font-semibold">
                {mod.title}
              </h2>
            </div>
            <div className="text-sm text-purple-500 px-4">
              {formatDuration(mod.duration)}
            </div>
          </div>

          {/* actions  */}
          <div className="w-full flex justify-end gap-2">
            <Button
              className="flex gap-1"
              onClick={(e) => {
                e.stopPropagation();
                setShowEditModal(true);
              }}
            >
              <div className="flex items-center gap-1">
                <MdEdit className="text-lg" />
                <span className="hidden sm:block">Edit</span>
              </div>
            </Button>
            <Button
              className="flex gap-1"
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteModal(true);
              }}
            >
              <div className="flex items-center gap-1">
                <FaDeleteLeft className="text-lg" />
                <span className="hidden sm:block">Drop</span>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {showModal && (
        <VideoModal
          videoUrl={mod.video}
          title={mod.title}
          onClose={() => setShowModal(false)}
          isDarkMode={isDarkMode}
        />
      )}

      {showEditModal && mod && (
        <div>
          <EditVideoModal
            isDarkMode={isDarkMode}
            setShowModal={setShowEditModal}
            reset={reset}
            handleSubmit={handleUpdate}
            title={editableTitle}
            setTitle={setEditableTitle}
            submitting={submitting}
            handleVideoInput={handleVideoInput}
            videoFile={videoFile}
            duration={duration}
            comments={links}
            setComments={setLinks}
          />
        </div>
      )}

      {showDeleteModal && (
        <DeleteModal
          title={mod.title}
          isDarkMode={isDarkMode}
          onConfirm={handleDeleteConfirm}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
};

interface DeleteModalProps {
  title: string;
  onConfirm: () => void;
  onClose: () => void;
  isDarkMode: boolean;
}

const DeleteModal = ({
  title,
  onConfirm,
  onClose,
  isDarkMode,
}: DeleteModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6 } }}
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
          <h1>
            Are you sure you want to drop &quot;
            <span className="text-purple-400">{title}</span>
            &quot;?
          </h1>
        </div>
        <div className="w-full flex items-center justify-end gap-4">
          <Button onClick={onClose}>Cancel</Button>
          <Button color="primary" variant="contained" onClick={onConfirm}>
            Drop
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

interface VideoModalProps {
  videoUrl: string;
  title: string;
  onClose: () => void;
  isDarkMode: boolean;
}

const VideoModal = ({
  videoUrl,
  title,
  onClose,
  isDarkMode,
}: VideoModalProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onLoaded = () => {
      setDuration(v.duration);
    };
    const onTimeUpdate = () => {
      setCurrentTime(v.currentTime);
      setProgress(v.currentTime / (v.duration || 1));
    };
    const onEnded = () => {
      setPlaying(false);
    };

    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("timeupdate", onTimeUpdate);
    v.addEventListener("ended", onEnded);

    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  }, [playing]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === " " || e.key === "k") {
        e.preventDefault();
        togglePlay();
      }
    },
    [onClose, togglePlay]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const fraction = Math.min(Math.max(clickX / rect.width, 0), 1);
    videoRef.current.currentTime = fraction * (videoRef.current.duration || 0);
    setProgress(fraction);
    setCurrentTime(videoRef.current.currentTime);
  };

  const onBackdropClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === "video-modal-backdrop") {
      onClose();
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div
      id="video-modal-backdrop"
      onClick={onBackdropClick}
      className="w-full fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs p-4"
      aria-label={`Video player modal for ${title}`}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col ${
          isDarkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex justify-end items-center px-2 py-2">
          <Button size="small" color="secondary" onClick={onClose}>
            Esc
          </Button>
        </div>

        <div className="relative w-full bg-black">
          <video
            ref={videoRef}
            className="w-full max-h-[60vh] object-contain cursor-pointer transition duration-300"
            src={videoUrl}
            onClick={togglePlay}
          />

          <div className="px-4 py-3 flex flex-col gap-2">
            <div
              className="h-2 rounded cursor-pointer relative bg-gray-700"
              onClick={handleSeek}
              aria-label="Seek bar"
            >
              <div
                style={
                  { "--progress": `${progress * 100}%` } as React.CSSProperties
                }
                className="h-full rounded bg-purple-500/30 w-[var(--progress)]"
              />

              <div
                className="absolute top-0 -translate-y-1/2 w-3 h-3 rounded-full bg-purple-500"
                style={{
                  left: `${progress * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            </div>

            <div className="flex items-center justify-between text-sm mt-1">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  aria-label={playing ? "Pause" : "Play"}
                  className="px-2 py-1 rounded cursor-pointer transition duration-300 delay-75"
                >
                  {playing ? (
                    <FaPause className="text-purple-500" />
                  ) : (
                    <FaPlay className="text-purple-500" />
                  )}
                </button>
                <div className="text-xs">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 cursor-pointer transition duration-300 delay-75">
                  <input
                    id="volume"
                    type="range"
                    className="cursor-pointer transition duration-300 delay-75"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    aria-label="Volume"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" hidden sm:flex px-4 py-2 text-xs text-gray-400  justify-between">
          <div>
            Press <kbd className="px-1 py-0.5 border rounded">Space</kbd> to
            play/pause
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
