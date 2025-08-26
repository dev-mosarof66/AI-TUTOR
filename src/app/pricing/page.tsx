'use client'
import PricingCards from "@/components/Pricing";
import React from "react";
import { useAppSelector } from "../hooks";

const Pricing = () => {
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  return (
    <div>
      <div
        className={`w-full min-h-screen flex flex-col md:items-center md:justify-center overflow-y-scroll 
        ${isDarkMode ? "bg-gray-800 " : "bg-gray-100"} py-20`}
      >
        <PricingCards />
      </div>
    </div>
  );
};

export default Pricing;
