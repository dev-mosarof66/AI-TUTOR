import React from "react";
import { Skeleton, Stack } from "@mui/material";

const VideoPlaceholder = () => {
  return (
    <Stack spacing={2} className="w-full h-60 sm:h-92 lg:h-[450px]">
      {/* Video skeleton */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        animation="wave"
        sx={{ borderRadius: 2 }}
      />
    </Stack>
  );
};

export default VideoPlaceholder;
