"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import AddModules from "@/components/admin/AddModules";
import VideoCard from "@/components/admin/VideoCard";
import { getAllModules } from "@/features/moudles/modules";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";

interface ModuleType {
  _id: string;
  title: string;
  video: string;
  createdAt: string;
  updatedAt: string;
  duration: number;
  links: string;
  __v: number;
}

const Playlist = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();
  const playlistId = params?.id;
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const { modules, loading, error, errorMessage } = useAppSelector(
    (state) => state.modules
  );
  // console.log(modules);

  useEffect(() => {
    if (!playlistId) return;
    dispatch(getAllModules(playlistId));
  }, [dispatch, playlistId]);

  useEffect(() => {
    if (error && errorMessage) {
      toast.error(String(errorMessage), {
        position: "top-right",
        duration: 4000,
      });
    }
  }, [error, errorMessage]);

  return (
    <div
      className={`w-full space-y-4 ${
        isDarkMode ? "text-gray-200" : "text-gray-700"
      }`}
    >
      <div className="w-full">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <span className="loading loading-ring loading-xl"></span>
          </div>
        ) : (
          <div className="w-full h-full">
            {playlistId && <AddModules playlistId={playlistId} />}
            {modules.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center py-6">
                <p className="text-sm text-gray-500">
                  No modules found for this playlist.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {modules &&
                  modules.map(
                    (mod: ModuleType, idx: number) =>
                      playlistId && (
                        <VideoCard
                          key={mod._id || idx}
                          mod={mod}
                          playlistId={playlistId}
                          isDarkMode={isDarkMode}
                        />
                      )
                  )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Playlist;
