import React from "react";
import { FiChevronsRight } from "react-icons/fi";
import { FaCrown } from "react-icons/fa6";

import "../../css/hero.css";
import Button from "./button";

const hero = () => {
  return (
    <div
      id="hero"
      className="w-full min-h-screen flex items-center  py-20 text-white"
    >
      <div className="w-full">
        <div className="grid grid-cols-1  gap-3">
          <h1 className="w-[80%] mx-auto xs:w-[70%] sm:w-sm md:w-lg text-center text-4xl xs:text-6xl sm:text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-br from-purple-900 via-green-400  to-purple-700">
            Introducing to Neura
          </h1>
          <p className="text-gray-400 font-semibold xs:text-lg sm:text-lg text-center md:text-xl">
            Your Ultimate AI Coding Tutor
          </p>
        </div>
        <div className="w-full sm:w-sm md:w-md mx-auto flex flex-col items-center justify-center sm:flex sm:flex-row sm:justify-around   gap-6 py-6">
          <Button isNav={false}>
            <>
              <FaCrown className="translate-x-0 group-hover:translate-x-11 group-active:translate-x-11  group-hover:text-black group-active:text-black group-hover:text-xl transition-all duration-500 delay-100" />
              <p className="group-hover:opacity-0 group-active:opacity-0 transition-all duration-700 delay-75">
                Explore
              </p>
            </>
          </Button>
          <Button isNav={false}>
            <>
              <FiChevronsRight className="translate-x-0 group-hover:translate-x-11 group-active:translate-x-11  group-hover:text-black group-active:text-black group-hover:text-xl transition-all duration-500 delay-100" />
              <p className="group-hover:opacity-0 group-active:opacity-0 transition-all duration-700 delay-75">
                Get Started
              </p>
            </>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default hero;
