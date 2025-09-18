"use client";
import React from "react";
import { Mail } from "lucide-react";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import Profile from "@/assets/profile.jpg";
import { useAppSelector } from "@/app/hooks";

const UserCard = () => {
  const {user} = useAppSelector((state)=>state.user)
  return (
    <div className="w-full  p-6 bg-black shadow shadow-purple-50">
      {/* Left side - Profile */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div>
          {user ? (
            <Image
              src={Profile}
              alt="profile"
              className="w-28 h-28 object-cover rounded-full border-4 border-gray-200 dark:border-gray-700"
            />
          ) : (
            <div>
              <FaUser size={25} />
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {user ? user.name : "N/A"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <Mail size={16} />
          <span>{user ? user.email : "N/A"}</span>
        </p>
      </div>
    </div>
  );
};

export default UserCard;
