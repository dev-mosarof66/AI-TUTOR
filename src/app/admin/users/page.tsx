"use client";
import React, { useState } from "react";
import UserTable from "@/components/admin/UserTable";
import UserProfileModal from "@/components/admin/UserProfileModal";

interface UserType {
  id: string;
  name: string;
  email: string;
  role: "Student" | "Instructor" | "Admin";
  status: "Active" | "Banned" | "Pending";
  enrolledCourses: number;
  lastActivity: string;
  feedbackCount: number;
  aiSessions: number;
}

const dummyUsers: UserType[] = [
  {
    id: "1",
    name: "johnson",
    email: "alice@example.com",
    role: "Student",
    status: "Active",
    enrolledCourses: 5,
    lastActivity: "2025-07-28",
    feedbackCount: 3,
    aiSessions: 12,
  },
  {
    id: "2",
    name: "smith",
    email: "bob@example.com",
    role: "Student",
    status: "Active",
    enrolledCourses: 3,
    lastActivity: "2025-07-26",
    feedbackCount: 0,
    aiSessions: 8,
  },
  {
    id: "3",
    name: "brown",
    email: "brown@example.com",
    role: "Student",
    status: "Active",
    enrolledCourses: 3,
    lastActivity: "2025-07-26",
    feedbackCount: 0,
    aiSessions: 8,
  },
  {
    id: "4",
    name: "jensom",
    email: "bob@example.com",
    role: "Student",
    status: "Active",
    enrolledCourses: 3,
    lastActivity: "2025-07-26",
    feedbackCount: 0,
    aiSessions: 8,
  },
];

const UsersPage = () => {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  return (
    <div className="p-6">
      <UserTable users={dummyUsers} onSelectUser={setSelectedUser} />

      <UserProfileModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
};

export default UsersPage;
