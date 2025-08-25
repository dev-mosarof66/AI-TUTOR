"use client";
import Sidebar from "@/components/profile/sidebar";
import React, { useEffect, useState } from "react";
import "../../css/sidebar.css";
import { useAppDispatch, useAppSelector } from "../hooks";
import { changeTheme } from "@/features/theme/themeSlice";
import Header from "@/components/custom/Header";
import Search from "@/components/custom/Search";
import { fetchUserData } from "@/features/user/userSlice";
import { useRouter } from "next/navigation";
import { getAllPlaylist } from "@/features/playlist/playlists";
import BottomTabs, { LogoutPopup } from "@/components/profile/bottom-tabs";

interface Type {
  children: React.ReactNode;
}

const CourseLayout = ({ children }: Type) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const { user, fetched } = useAppSelector((state) => state.user);
  const [searchMode, setSearchMode] = useState(false);
  const [logoutPopup, setLogoutPopup] = useState(false);

  // Load theme + user
  useEffect(() => {
    if (typeof window !== "undefined") {
      const load = localStorage.getItem("p_xyz");
      const theme = load ? JSON.parse(load) : null;
      if (theme) dispatch(changeTheme(theme));
    }
    dispatch(fetchUserData());
    dispatch(getAllPlaylist());
  }, [dispatch]);

  // Redirect if no user
  useEffect(() => {
    const isUserNew = localStorage.getItem("isNewUser");
    const parsed = JSON.parse(isUserNew || "true");
    console.log("User:", user, "IsNew:", parsed, "Fetched:", fetched);
    if (!parsed && fetched && !user) {
      router.push("/");
    }
  }, [user, fetched, router]);

  return (
    <div
      className={`w-full h-screen flex ${
        isDarkMode ? "bg-gray-800" : "bg-stone-100"
      }`}
    >
      <Sidebar />
      <BottomTabs logout={logoutPopup} setLogout={setLogoutPopup} />
      <div className="flex flex-col h-screen w-[95%] mx-auto sm:w-[90%]">
        <Header setSearchMode={setSearchMode} hideSearch={true} />
        <div className="flex-grow overflow-y-auto md:pt-4 scrollbar-hidden">
          {children}
        </div>
      </div>
      {searchMode && (
        <Search setSearchMode={setSearchMode} isDarkMode={isDarkMode} />
      )}
      {logoutPopup && <LogoutPopup setLogout={setLogoutPopup} />}
    </div>
  );
};

export default CourseLayout;
