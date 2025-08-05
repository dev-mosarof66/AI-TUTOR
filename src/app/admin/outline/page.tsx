"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import CreateOutline from "@/components/admin/CreateOutline";
import CourseOutline from "@/components/admin/CourseOutline";
import { getAllOutlines } from "@/features/outline/outline";

const Outline = () => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector(
    (state) => state.outlines
  );
  const isDarkMode = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    dispatch(getAllOutlines());
  }, [dispatch]);

  return (
    <div
      className={`w-full h-full px-4 py-6 ${
        isDarkMode ? "text-gray-200" : "text-gray-700"
      }`}
    >
      <CreateOutline />

      <div className="w-full flex items-center justify-center mt-6">
        {loading ? (
          <span className="loading loading-ring loading-lg" />
        ) : (
          <CourseOutline />
        )}
      </div>
    </div>
  );
};

export default Outline;
