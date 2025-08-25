"use client";
import Sidebar from "@/components/custom/sidebar";
import React, { useEffect, useState } from "react";
import { FaStar, FaFire, FaUserAlt } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import "../../css/sidebar.css";
import { useAppDispatch, useAppSelector } from "../hooks";
import { changeTheme } from "@/features/theme/themeSlice";
import Header from "@/components/custom/Header";
import Search from "@/components/custom/Search";
import { fetchUserData } from "@/features/user/userSlice";
import { useRouter } from "next/navigation";
import { getAllPlaylist } from "@/features/playlist/playlists";

interface Type {
  children: React.ReactNode;
}

const Items = [
  {
    id: 1,
    name: "Home",
    Icon: () => <MdHome size={24} className="text-purple-600" />,
    link: "/courses",
  },
  {
    id: 2,
    name: "Popular",
    Icon: () => <FaStar size={21} className="text-purple-600" />,
    link: "/courses/popular",
  },
  {
    id: 3,
    name: "My Courses",
    Icon: () => <FaFire size={20} className="text-purple-600" />,
    link: "/courses/my-courses",
  },
  {
    id: 4,
    name: "Profile",
    Icon: () => <FaUserAlt size={20} className="text-amber-400" />,
    link: "/profile",
  },
];

const CourseLayout = ({ children }: Type) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const { user, fetched } = useAppSelector((state) => state.user);
  const [searchMode, setSearchMode] = useState(false);

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
      <Sidebar items={Items} isDarkMode={isDarkMode} />
      <div className="flex flex-col h-screen w-[95%] mx-auto sm:w-[90%]">
        <Header setSearchMode={setSearchMode} hideSearch={false} />
        <div className="flex-grow overflow-y-auto md:pt-4 scrollbar-hidden">
          {children}
        </div>
      </div>
      {searchMode && (
        <Search setSearchMode={setSearchMode} isDarkMode={isDarkMode} />
      )}
    </div>
  );
};

export default CourseLayout;
