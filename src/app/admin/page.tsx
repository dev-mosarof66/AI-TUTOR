"use client";
import React from "react";
import {
  FaUsers,
  FaRobot,
  FaBookOpen,
} from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import Card from "@/components/admin/Card";
import { useAppSelector } from "../hooks";

const stats = [
  {
    title: "Total Users",
    value: "1,250",
    icon: <FaUsers className="text-green-500" size={22} />,
  },
  {
    title: "AI Sessions Today",
    value: "342",
    icon: <FaRobot className="text-purple-500" size={22} />,
  },
  {
    title: "Courses",
    value: "28",
    icon: <FaBookOpen className="text-gray-500" size={22} />,
  },
  {
    title: "Feedback",
    value: "89",
    icon: <MdFeedback className="text-green-400" size={22} />,
  },
];

const Dashboard = () => {
  const isDarkMode = useAppSelector((state) => state.theme.theme);

  const bgColor = isDarkMode ? "bg-gray-900" : "bg-gray-100";
  const textPrimary = isDarkMode ? "text-white" : "text-gray-800";
  const textSecondary = isDarkMode ? "text-gray-400" : "text-gray-600";
  const sectionTitle = isDarkMode ? "text-purple-300" : "text-purple-700";

  return (
    <div className={`w-full p-4 sm:p-6 ${bgColor} ${textPrimary}`}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-purple-500">
          Welcome back, Admin 👋
        </h1>
        <p className={`text-sm ${textSecondary} mt-1`}>
          Here is an overview of today’s performance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((item, index) => (
          <Card key={index} title={item.title} className={isDarkMode ? "bg-purple-500/40" : "bg-purple-300 text-gray-700"}>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold">{item.value}</p>
              <div className="text-xl">{item.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="" className={isDarkMode ? "bg-purple-700/50" : "bg-purple-200 text-gray-900"}>
          <h2 className={`text-lg font-semibold mb-2 ${sectionTitle}`}>Recent Activity</h2>
          <ul className={`text-sm ${textSecondary} list-disc pl-5 space-y-2`}>
            <li>New user registered: John Doe</li>
            <li>AI session completed by student123</li>
            <li>New feedback received</li>
            <li>Course &qout;JS Basics&qout; updated</li>
          </ul>
        </Card>

        <Card title="" className={isDarkMode ? "bg-purple-700/50" : "bg-purple-200 text-gray-900"}>
          <h2 className={`text-lg font-semibold mb-2 ${sectionTitle}`}>AI System Health</h2>
          <ul className={`text-sm ${textSecondary} space-y-2`}>
            <li>🟢 AI Model: Stable</li>
            <li>🟢 Latency: 120ms</li>
            <li>🟢 Errors Today: 0</li>
            <li>🟢 Uptime: 99.9%</li>
          </ul>
        </Card>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="" className={isDarkMode ? "bg-purple-700/50" : "bg-purple-200 text-gray-900"}>
          <h2 className={`text-lg font-semibold mb-2 ${sectionTitle}`}>Tasks</h2>
          <ul className={`text-sm ${textSecondary} list-disc pl-5 space-y-2`}>
            <li>Review 5 new feedbacks</li>
            <li>Approve 2 pending courses</li>
            <li>Moderate flagged session</li>
          </ul>
        </Card>

        <Card title="" className={isDarkMode ? "bg-purple-700/50" : "bg-purple-200 text-gray-900"}>
          <h2 className={`text-lg font-semibold mb-2 ${sectionTitle}`}>Announcements</h2>
          <ul className={`text-sm ${textSecondary} space-y-2`}>
            <li>✅ v2.1 AI Model Deployed</li>
            <li>🛠 Scheduled maintenance on Aug 2</li>
            <li>📢 New UI updates live</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
