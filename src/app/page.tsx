"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import bg from "../assets/background.gif";
import Navbar from "@/components/custom/navbar";
import Hero from "@/components/custom/hero";
import { useAppDispatch, useAppSelector } from "./hooks";
import { checkUserAuth } from "@/features/user/userSlice";
import { useRouter } from "next/navigation";
const Home = () => {
  const router = useRouter();
  const { user, loading } = useAppSelector((state) => state.user);
  const isDarkMode = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
    if (user) {
      router.push("/courses");
    }
  }, [dispatch, router, user]);

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
      <div className="w-full min-h-screen">
        <Image src={bg} className="w-full h-screen" alt="background" />
      </div>

      {/* main content goes here  */}

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
