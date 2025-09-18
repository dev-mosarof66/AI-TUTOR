"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchUserData } from "@/features/user/userSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Home = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {  user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      router.push("/courses");
    }
  }, [user, router]);

  useEffect(() => {
    const isUserNew = localStorage.getItem("isNewUser");
    const parsed = JSON.parse(isUserNew || "true");

    if (parsed === "false" && !user) {
      toast.error("Login session expired.Please login again.");
      router.push("/auth");
    }
  }, [router, user]);


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
