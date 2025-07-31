"use client";
import React from "react";
import Image from "next/image";

interface User {
  id: string;
  name: string;
  email: string;
  role: "Student" | "Instructor" | "Admin";
  status: "Active" | "Banned" | "Pending";
  enrolledCourses: number;
  lastActivity: string;
  avatarUrl?: string;
}

interface UserCardProps {
  user: User;
  onClick?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  const roleColors = {
    Student: "bg-green-200 text-green-800",
    Instructor: "bg-purple-200 text-purple-800",
    Admin: "bg-yellow-200 text-yellow-800",
  };

  const statusColors = {
    Active: "text-green-500",
    Banned: "text-red-500",
    Pending: "text-gray-500",
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-4 border rounded-lg shadow hover:shadow-lg transition flex items-center gap-4 bg-white dark:bg-gray-800"
    >
      <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xl font-semibold text-gray-700 dark:text-gray-200 overflow-hidden relative">
        {user.avatarUrl ? (
          <Image
            src={user.avatarUrl}
            alt={user.name}
            fill
            sizes="48px"
            className="object-cover rounded-full"
          />
        ) : (
          user.name[0]
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{user.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${roleColors[user.role]}`}>
            {user.role}
          </span>
          <span className={`text-xs font-medium ${statusColors[user.status]}`}>
            {user.status}
          </span>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {user.enrolledCourses} courses
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Last active: {user.lastActivity}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
