"use client";
import React from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "Student" | "Instructor" | "Admin";
  status: "Active" | "Banned" | "Pending";
  enrolledCourses: number;
  lastActivity: string;
  feedbackCount?: number;
  aiSessions?: number;
}

interface UserProfileModalProps {
  user: User | null;
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          aria-label="Close"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {user.name} — {user.role}
        </h2>
        <p className="mb-1 text-gray-700 dark:text-gray-300">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="mb-1 text-gray-700 dark:text-gray-300">
          <strong>Status:</strong> {user.status}
        </p>
        <p className="mb-1 text-gray-700 dark:text-gray-300">
          <strong>Enrolled Courses:</strong> {user.enrolledCourses}
        </p>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          <strong>Last Active:</strong> {user.lastActivity}
        </p>
        <div>
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">User Activity</h3>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 text-sm space-y-1">
            <li>AI Sessions: {user.aiSessions ?? 0}</li>
            <li>Feedback Submitted: {user.feedbackCount ?? 0}</li>
            {/* Add more activity details as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
