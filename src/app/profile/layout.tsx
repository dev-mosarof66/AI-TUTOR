"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { changeTheme } from "@/features/theme/themeSlice";
import { fetchUserData } from "@/features/user/userSlice";
import Sidebar from "@/components/profile/sidebar";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const load = localStorage.getItem("p_xyz");
    const theme = load ? JSON.parse(load) : null;
    dispatch(changeTheme(theme));
    dispatch(fetchUserData());
  }, [dispatch]);
  return (
    <div
      className={`w-full h-screen flex  ${
        !isDarkMode ? "bg-stone-100" : " bg-gray-800"
      } gap-4`}
    >
      <div className="h-screen">
        <Sidebar />
      </div>
      <div className="flex-1 h-screen overflow-y-scroll bg-green-600">{children}</div>
    </div>
  );
};

export default ProfileLayout;
