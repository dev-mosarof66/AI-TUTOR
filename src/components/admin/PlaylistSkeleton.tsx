import React from "react";
import { Skeleton, Box } from "@mui/material";

const PlaylistSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 mb-8 p-4 rounded-lg shadow-md bg-gray-100 dark:bg-gray-800">
      {/* Thumbnail */}
      <div className="relative w-full md:w-64 h-40 rounded-lg overflow-hidden">
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between">
        <Box sx={{ mb: 1 }}>
          <Skeleton variant="text" width="60%" height={28} />
          <Skeleton variant="text" width="95%" height={18} />
          <Skeleton variant="text" width="90%" height={18} />
          <Skeleton variant="text" width="50%" height={18} />
        </Box>

        {/* Modules */}
        <Box>
          <Skeleton variant="text" width="40%" height={20} />
          <Skeleton variant="text" width="80%" height={18} />
          <Skeleton variant="text" width="70%" height={18} />
        </Box>
      </div>
    </div>
  );
};


export default PlaylistSkeleton