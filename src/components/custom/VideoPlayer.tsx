"use client";
import { useAppSelector } from "@/app/hooks";
import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaExpand, FaCompress } from "react-icons/fa";
import { FiChevronsRight, FiChevronsLeft } from "react-icons/fi";
import VideoPlaceholder from "./VideoPlaceholder";

const speeds = [0.5, 0.75, 1, 1.5, 2.0, 2.5, 3];

interface SourceProps {
  currentVideoIndex: number;
  setCurrentVideoIndex: (val: number) => void;
}

const VideoPlayer = ({
  currentVideoIndex,
  setCurrentVideoIndex,
}: SourceProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(2);
  const [hovered, setHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { loading, modules } = useAppSelector((state) => state.modules);

  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const couterRef = useRef<NodeJS.Timeout | null>(null);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeSpeed = (direction: "up" | "down") => {
    let newIndex = speedIndex;
    if (direction === "up" && speedIndex < speeds.length - 1) newIndex++;
    if (direction === "down" && speedIndex > 0) newIndex--;

    setSpeedIndex(newIndex);
  };

  const goToPrevious = () => {
    const prevIndex = (currentVideoIndex - 1 + modules.length) % modules.length;
    setCurrentVideoIndex(prevIndex);
  };

  const goToNext = () => {
    const nextIndex = (currentVideoIndex + 1) % modules.length;
    setCurrentVideoIndex(nextIndex);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Sync playbackRate
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speeds[speedIndex];
    }
  }, [speedIndex, currentVideoIndex]);

  //checks either fullscreen or not

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Auto play on video change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [currentVideoIndex]);

  // Track progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setProgress(video.currentTime);
      setDuration(video.duration);
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("loadedmetadata", updateProgress);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("loadedmetadata", updateProgress);
    };
  }, []);

  // countdown useeffct

  useEffect(() => {
    if (!showCountdown) return;
    couterRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(couterRef.current!);
          setShowCountdown(false);
          goToNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  });

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newTime = Number(e.target.value);
    videoRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg relative cursor-pointer transition duration-300 delay-75"
      onClick={togglePlayPause}
    >
      <div className="w-full h-full object-contain rounded-xl border border-purple-600">
        {loading ? (
          <VideoPlaceholder />
        ) : modules.length > 0 ? (
          <video
            ref={videoRef}
            src={modules[currentVideoIndex].video}
            className="w-full h-full object-contain rounded-xl border border-purple-600"
            onEnded={() => {
              setShowCountdown(true);
              setCountdown(10);
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            controls={false}
          />
        ) : (
          <div className="w-full h-60 sm:h-92 lg:h-[450px]" />
        )}
      </div>

      {/* play pause button  */}
      {(hovered || !isPlaying) && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            togglePlayPause();
          }}
          className="absolute inset-0 z-40 flex items-center justify-center text-white bg-opacity-30 hover:bg-opacity-50 transition rounded-xl"
          aria-label={!isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <FaPause className="drop-shadow-lg text-xl sm:text-2xl text-purple-600" />
          ) : (
            <FaPlay className="drop-shadow-lg text-xl sm:text-2xl text-purple-600" />
          )}
        </div>
      )}

      {/* 10s countdown timer */}

      {showCountdown && (
        <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-3xl text-white z-50 rounded-xl cursor-pointer">
          <p className="text-sm sm:text-base mb-2">Next video will start in</p>
          <div className="text-2xl sm:text-3xl font-bold text-purple-400">
            {countdown}
          </div>
        </div>
      )}

      {hovered && (
        <div className="w-full bg-black flex items-center justify-center">
          <div className="w-[98%] flex flex-col gap-2 px-2 sm:px-4 py-2 text-white absolute bottom-1 z-50 backdrop-blur-2xl rounded-lg transition duration-300 delay-75">
            <div className="flex justify-between items-center">
              {/* previous next button  */}
              <div className="flex items-center gap-2 sm:gap-4">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  title="Previous"
                  className="cursor-pointer text-base text-purple-700 sm:text-xl hover:scale-110 active:ring active:ring-purple-500 transition"
                >
                  <FiChevronsLeft />
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  title="Next"
                  className="cursor-pointer text-base  text-purple-700  sm:text-xl hover:scale-110 active:ring active:ring-purple-500 transition"
                >
                  <FiChevronsRight />
                </div>
              </div>
              {/* Timeline */}
              <div className="w-fit sm:w-[55 %]">
                <input
                  type="range"
                  min={0}
                  max={duration}
                  value={progress}
                  onChange={handleSeek}
                  className="w-full accent-purple-500 cursor-pointer transition"
                />
              </div>

              {/* speed and fullscreen  */}
              <div className="flex items-center gap-2 sm:gap-4">
                {/* Speed Controls */}
                <div className="bg-purple-500/30 flex items-center gap-1 px-1 py-1 rounded">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      changeSpeed("down");
                    }}
                    disabled={speedIndex === 0}
                    className={`px-1 sm:px-2 text-sm sm:text-base ${
                      speedIndex === 0
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-purple-500/30"
                    } cursor-pointer`}
                  >
                    −
                  </button>
                  <span className="text-xs sm:text-sm">
                    {speeds[speedIndex]}x
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      changeSpeed("up");
                    }}
                    disabled={speedIndex === speeds.length - 1}
                    className={`px-1 sm:px-2 text-sm sm:text-base ${
                      speedIndex === 0
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-purple-500/30"
                    } cursor-pointer`}
                  >
                    +
                  </button>
                </div>

                {/* Fullscreen Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFullscreen();
                  }}
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  className="text-base sm:text-xl hover:scale-110 text-purple-400 cursor-pointer transition duration-300 delay-75"
                >
                  {isFullscreen ? <FaCompress /> : <FaExpand />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
