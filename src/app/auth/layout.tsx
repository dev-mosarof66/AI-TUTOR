"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { changeTheme } from "@/features/theme/themeSlice";
import { fetchUserData } from "@/features/user/userSlice";
import { useRouter } from "next/navigation";

const AuthLaout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

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

  return <div>{children}</div>;
};

export default AuthLaout;
