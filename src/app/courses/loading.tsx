import React from "react";

const Loading = () => {
  return (
    <div
      className={`w-full h-screen flex flex-col items-center justify-center dark:bg-gray-800 bg-gray-300
      `}
    >
      <span className="loading loading-ring text-primary loading-lg"></span>
    </div>
  );
};

export default Loading;
