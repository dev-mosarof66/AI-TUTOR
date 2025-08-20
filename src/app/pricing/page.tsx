import Navbar from "@/components/navbar";
import PricingCards from "@/components/Pricing";
import React from "react";

const Pricing = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full min-h-screen flex flex-col md:items-center md:justify-center overflow-y-scroll dark:bg-gray-800 bg-gray-100 py-20">
        <PricingCards />
      </div>
    </div>
  );
};

export default Pricing;
