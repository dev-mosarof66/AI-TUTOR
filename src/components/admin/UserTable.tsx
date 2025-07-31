"use client";
import { useAppSelector } from "@/app/hooks";
import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";

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

interface UserTableProps {
  users: UserType[];
  onSelectUser: (user: UserType) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onSelectUser }) => {
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("Student");
  const [searchModal, setSearchModal] = useState(false);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === "All" || user.role === filterRole;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="w-full overflow-x-auto">
      {/* Filters */}
      <div className="w-[90%] md:w-[85%] mx-auto flex items-center justify-between mb-4 gap-3">
        <div>
          <IconButton color="primary" onClick={() => setSearchModal(true)}>
            <FaSearch className="text-xl" />
          </IconButton>
          {searchModal && (
            <div className="w-full h-screen flex items-center justify-center backdrop-blur-2xl fixed top-0 left-0 z-50">
              <div
                className={`w-[90%] sm:w-lg h-96 mx-auto bg-purple-500/40 p-4 rounded-sm ${
                  isDarkMode
                    ? "border-gray-600 text-gray-200"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                <div className="w-full flex items-center gap-2 border border-green-500 active:ring active:ring-green-600 focus:ring focus:ring-green-500 py-2 px-4 rounded-sm">
                  <FaSearch className="text-xl" />
                  <input
                    type="text"
                    placeholder="Search by name or email"
                    className={`w-full outline-none`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <IconButton
                    color="secondary"
                    onClick={() => setSearchModal(false)}
                  >
                    <FaTimes className="text-xl" />
                  </IconButton>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* filter by  */}
        <div className="flex items-center gap-6">
          <div
            className={`hidden md:block ${
              isDarkMode ? "text-gray-200" : "text-gray-500"
            } font-semibold`}
          >
            <h2>Filter :</h2>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <Tooltip title="Student" arrow>
              <div
                className={`${
                  filterRole === "Student" ? "bg-purple-500/30" : "bg-none"
                } rounded-full`}
              >
                <IconButton
                  color="primary"
                  onClick={() => setFilterRole("Student")}
                >
                  <PiStudentBold />
                </IconButton>
              </div>
            </Tooltip>
            <Tooltip title="Moderator" arrow>
              <div
                className={`${
                  filterRole === "Moderator" ? "bg-purple-500/30" : "bg-none"
                } rounded-full`}
              >
                <IconButton
                  color="primary"
                  onClick={() => setFilterRole("Moderator")}
                >
                  <GiTeacher />
                </IconButton>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Table */}
      <table
        className={`min-w-full border rounded-md text-sm sm:text-base ${
          isDarkMode ? "border-gray-700" : "border-gray-300"
        }`}
      >
        <thead className={`${isDarkMode ? "bg-gray-800" : "bg-purple-100"}`}>
          <tr>
            {["Username", "Email", "Enrolled", "Status"].map((heading) => (
              <th
                key={heading}
                className={`p-3 font-medium text-left ${
                  isDarkMode
                    ? "text-purple-300 border-gray-700"
                    : "text-purple-800 border-gray-300"
                } border-b`}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className={`text-center py-6 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                No users found.
              </td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <tr
                key={user.id}
                className={`cursor-pointer transition duration-200 ${
                  isDarkMode ? "hover:bg-purple-800/20" : "hover:bg-purple-100"
                }`}
                onClick={() => onSelectUser(user)}
              >
                <td
                  className={`px-4 py-3 border-b ${
                    isDarkMode
                      ? "text-gray-300 border-gray-700"
                      : "text-gray-700 border-gray-300"
                  }`}
                >
                  {user.name}
                </td>
                <td
                  className={`px-4 py-3 border-b ${
                    isDarkMode
                      ? "text-gray-300 border-gray-700"
                      : "text-gray-700 border-gray-300"
                  }`}
                >
                  {user.email}
                </td>
                <td
                  className={`px-4 py-3 border-b ${
                    isDarkMode
                      ? "text-gray-300 border-gray-700"
                      : "text-gray-700 border-gray-300"
                  }`}
                >
                  {user.enrolledCourses}
                </td>
                <td
                  className={`px-4 py-3 border-b font-medium ${
                    user.status === "Active"
                      ? "text-green-500"
                      : user.status === "Banned"
                      ? "text-red-500"
                      : "text-yellow-500"
                  } ${isDarkMode ? "border-gray-700" : "border-gray-300"}`}
                >
                  {user.status}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
