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
import { MdHome, MdEdit, MdSubscriptions } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";

interface Type {
  children: React.ReactNode;
}

const items = [
  {
    id: 1,
    name: "Home",
    Icon: () => <MdHome size={24} className="text-purple-600" />,
    link: "/profile",
  },
  {
    id: 2,
    name: "Enrolled Courses",
    Icon: () => <FaListAlt size={20} className="text-purple-400" />,
    link: "/profile/enrolled-courses",
  },
  {
    id: 3,
    name: "Edit Profile",
    Icon: () => <MdEdit size={21} className="text-purple-400" />,
    link: "/profile/edit-profile",
  },
  {
    id: 4,
    name: "Subscriptions",
    Icon: () => <MdSubscriptions size={20} className="text-amber-400" />,
    link: "/profile/subscriptions",
  },
];

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
    if (!parsed && fetched && !user) {
      router.push("/");
    }
  }, [user, fetched, router]);

  return (
    <div
      className={`w-full h-screen flex flex-col sm:flex sm:flex-row justify-between ${
        isDarkMode ? "bg-gray-800" : "bg-stone-100"
      }`}
    >
      <Sidebar title="Neura" isDarkMode={isDarkMode} items={items} />
      <div className="flex flex-col h-[90vh] w-[98%]  mx-auto sm:w-[90%]">
        <Header />
        <div className="flex-grow overflow-y-auto md:pt-4 scrollbar-hidden">
          {children}
        </div>
      </div>
      <BottomTabs setLogout={setLogoutPopup} items={items} />
      {searchMode && (
        <Search setSearchMode={setSearchMode} isDarkMode={isDarkMode} />
      )}
      {logoutPopup && <LogoutPopup setLogout={setLogoutPopup} />}
    </div>
  );
};

export default CourseLayout;
