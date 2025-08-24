"use client";
import React from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import { useAppSelector } from "./hooks";

const Home = () => {
  const { loading } = useAppSelector((state) => state.user);
  const isDarkMode = useAppSelector((state) => state.theme);

  if (loading) {
    return (
      <div
        className={`w-full h-screen flex flex-col items-center justify-center ${
          isDarkMode ? "bg-gray-800" : "bg-gray-300"
        }`}
      >
        <span className="loading loading-ring loading-xl"></span>
        <p className="w-full text-center my-4 text-purple-600">
          Fetching user data...
        </p>
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen">
      <div className="absolute top-0 w-full">
        <div className="w-full mx-auto min-h-screen">
          <Navbar />
          <div>
            <Hero />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
