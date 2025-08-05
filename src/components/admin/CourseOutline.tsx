"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { deleteOutlineById } from "@/features/outline/outline";
import { FaDeleteLeft } from "react-icons/fa6";
import { IconButton } from "@mui/material";

const AllCourseOutlines = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const { outlines, loading } = useAppSelector((state) => state.outlines);

  const handleDelete = (id: string) => {
    dispatch(deleteOutlineById(id));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (outlines.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 font-medium">
        No course outlines found.
      </div>
    );
  }
  console.log("inside the course oultine");
  console.log(outlines);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {outlines.length > 0 &&
        outlines.map((outline) => (
          <div
            key={outline?._id || outline?.id}
            className={`${
              isDarkMode ? "bg-gray-700" : ""
            } rounded-lg shadow p-5 hover:shadow-lg active:ring active:ring-purple-500 transition duration-200 cursor-pointer`}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">{outline.title}</h2>
              <IconButton
                onClick={() => handleDelete(outline?._id)}
                color="secondary"
              >
                <FaDeleteLeft size={22} />
              </IconButton>
            </div>
            <div className="space-y-2">
              {outline.modules &&
                outline.modules.slice(0, 2).map((mod, index) => (
                  <div key={`${mod.title}-${index}`} className="pl-2">
                    <h3 className="text-gray-400">{mod.title}</h3>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default React.memo(AllCourseOutlines);
