import React from "react";
import { Skeleton } from "@mui/material";
import { useAppSelector } from "@/app/hooks";

interface PlaylistSkeletonProps {
  moduleLines?: number;
}

const PlaylistSkeleton: React.FC<PlaylistSkeletonProps> = () => {
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  return (
    <div
      role="status"
      aria-busy="true"
      className={`flex flex-col  gap-2 p-4 rounded-lg shadow-md ${
        isDarkMode ? " bg-gray-800" : "bg-gray-100"
      }`}
    >
      <div className="relative w-full h-8 rounded-lg overflow-hidden flex-shrink-0">
        <Skeleton variant="text" width="100%" height="100%" />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="w-full h-20">
          <Skeleton variant="text" width="100%" height="100%" />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            <Skeleton variant="rectangular" width={80} height={24} />
            <Skeleton variant="rectangular" width={100} height={24} />
          </div>
          <Skeleton variant="rectangular" width={100} height={32} />
        </div>
      </div>
    </div>
  );
};

export default PlaylistSkeleton;
