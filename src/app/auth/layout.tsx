"use client";
import React, { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { changeTheme } from "@/features/theme/themeSlice";

const AuthLaout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const load = localStorage.getItem("p_xyz");
    const theme = load ? JSON.parse(load) : null;
    dispatch(changeTheme(theme));
  }, [dispatch]);
  return <div>{children}</div>;
};

export default AuthLaout;
