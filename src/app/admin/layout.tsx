"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { changeTheme } from "@/features/theme/themeSlice";
import Header from "@/components/admin/Header";
import "@/css/sidebar.css";
import Sidebar from "@/components/admin/sidebar";
import { MdDashboard, MdFeedback } from "react-icons/md";
import { FaUsers, FaRobot, FaCode } from "react-icons/fa";
import { FaChartLine, FaMoneyBill } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { IoBookmarks } from "react-icons/io5";

interface Type {
  children: React.ReactNode;
}

const Tabs = [
  {
    id: 1,
    name: "Dashboard",
    Icon: () => <MdDashboard size={22} />,
    navigation: "/admin",
  },
  {
    id: 2,
    name: "Users",
    Icon: () => <FaUsers size={22} />,
    navigation: "/admin/users",
  },
  {
    id: 3,
    name: "Playlists",
    Icon: () => <IoBookmarks  size={22} />,
    navigation: "/admin/playlists",
  },
  {
    id: 4,
    name: "AI Sessions",
    Icon: () => <FaRobot size={22} />,
    navigation: "/admin/ai-sessions",
  },
  {
    id: 5,
    name: "Code Logs",
    Icon: () => <FaCode size={22} />,
    navigation: "/admin/code-logs",
  },
  {
    id: 6,
    name: "Feedback",
    Icon: () => <MdFeedback size={22} />,
    navigation: "/admin/feedback",
  },
  {
    id: 7,
    name: "Analytics",
    Icon: () => <FaChartLine size={22} />,
    navigation: "/admin/analytics",
  },
  {
    id: 8,
    name: "Billing",
    Icon: () => <FaMoneyBill size={22} />,
    navigation: "/admin/billing",
  },
  {
    id: 9,
    name: "Settings",
    Icon: () => <FiSettings size={22} />,
    navigation: "/admin/settings",
  },
];

const AdminLayout = ({ children }: Type) => {
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();
  console.log("isDarkMode in course", isDarkMode);
  useEffect(() => {
    const load = localStorage.getItem("p_xyz");
    const theme = load ? JSON.parse(load) : null;
    dispatch(changeTheme(theme));
  }, [dispatch]);
  return (
    <div
      className={`w-full h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-stone-100"
      }`}
    >
      <div className="w-full flex flex-col sm:flex sm:flex-row items-center">
        <div className="w-full sm:hidden">
          <Header items={Tabs} isLarge={false} />
        </div>
        <Sidebar items={Tabs} isDarkMode={isDarkMode} />
        <div className="w-full h-[88vh] sm:h-screen overflow-y-scroll scrollbar-hidden">
          <div className="w-full hidden sm:block">
            <Header items={Tabs} isLarge={true} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
