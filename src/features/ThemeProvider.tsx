"use client";
import { store } from "@/app/store";
import React from "react";
import { Provider } from "react-redux";

interface Type {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: Type) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ThemeProvider;
