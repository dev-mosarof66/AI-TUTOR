/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/app/hooks";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dummyAvatar from "@/assets/bg.gif";

const EditProfile = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  console.log(user);

  // local state for form fields
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [username, setUsername] = useState(user?.name || "");
  const [fullname, setFullname] = useState(user?.fullname || "");
  const [github, setGithub] = useState(user?.github || "");
  const [school, setSchool] = useState(user?.school || "");
  const [email] = useState(user?.email || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: hook this up to your API call or Redux action
    console.log("Updated Profile:", { name, email, avatar, github, school });
  };

  if (!user) {
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <p>Fetching user data...</p>
    </div>;
  }

  return (
    <div className="w-[96%] xs:w-[90%] max-w-lg mx-auto flex justify-center mb-20">
      <div className="w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <Image
              src={dummyAvatar}
              alt="Avatar"
              width={96}
              height={96}
              className="rounded-full object-cover border border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* User Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-200 bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder='username'
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
              Full Name
            </label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-200 bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
               placeholder='Your Full Name'
            />
          </div>

          {/* Email (fixed) */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-500 dark:text-gray-400 cursor-not-allowed"

            />
            <p className="text-xs text-gray-400 mt-1 px-2">
              Email cannot be changed
            </p>
          </div>

          {/* GitHub */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
              GitHub
            </label>
            <input
              type="url"
              placeholder="https://github.com/username"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-200 bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* School / College */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
              School / College
            </label>
            <input
              type="text"
              placeholder="Your School or College"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-200 bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 active:scale-95 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
