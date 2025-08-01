/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAppSelector } from "@/app/hooks";
import AddModules from "@/components/admin/AddModules";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Type {
  params: {
    id: string;
  };
}

interface ModuleType {
  _id: string;
  title: string;
  duration: number;
  video: string;
  comments: string;
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

const Playlist =  ({ params }: Type) => {
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const [allModules, setAllModules] = useState<ModuleType[]>([]);
  console.log(allModules)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } =  params;

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const fetchPlaylistData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`/api/courses/modules/${id}`);
        const modules: ModuleType[] =
          res.data?.data?.modules || res.data?.modules || res.data?.data || [];
        if (!cancelled) {
          setAllModules(Array.isArray(modules) ? modules : []);
        }
      } catch (err: any) {
        if (!cancelled) {
          const message =
            err?.response?.data?.message ||
            err?.message ||
            "Failed to fetch modules.";
          setError(message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchPlaylistData();
    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        duration: 4000,
      });
    }
  }, [error]);

  return (
    <div
      className={`w-full h-full space-y-4 ${
        isDarkMode ? "text-gray-200" : " text-gray-700"
      }`}
    >
      <div className="w-full h-full">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <span className="loading loading-ring loading-xl"></span>
          </div>
        ) : (
          <div className="w-full h-full">
            <AddModules playlistId={id}/>
            {allModules.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-sm text-gray-500">
                  No modules found for this playlist.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {allModules.map((mod, idx) => (
                  <div
                    key={mod._id}
                    className={`p-4 rounded-lg shadow ${
                      isDarkMode ? "bg-gray-800" : "bg-gray-100"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-lg font-medium">
                          {idx + 1}. {mod.title}
                        </h2>
                        <p className="text-sm mt-1">{mod.comments}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDuration(mod.duration)}
                      </div>
                    </div>
                    {mod.video && (
                      <div className="mt-3">
                        <a
                          href={mod.video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline text-sm"
                        >
                          Watch Video
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Playlist;
