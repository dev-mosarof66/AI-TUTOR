"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { changeTheme } from "@/features/theme/themeSlice";
import { fetchUserData } from "@/features/user/userSlice";
import { useRouter } from "next/navigation";

const AuthLaout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    const load = localStorage.getItem("p_xyz");
    const theme = load ? JSON.parse(load) : null;
    dispatch(changeTheme(theme));
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      router.push("/courses");
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-300 dark:bg-gray-800">
        <span className="loading loading-ring loading-xl"></span>
        <p className="w-full text-center my-4 text-purple-600">
          Fetching user data...
        </p>
      </div>
    );
  }

  return <div>{children}</div>;
};

export default AuthLaout;
