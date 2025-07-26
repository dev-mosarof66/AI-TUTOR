"use client";
import React, { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { motion } from "framer-motion";
import "../../css/navbar.css";
import { FiChevronsRight } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const location = usePathname();
  const isCoursesRoute = location === "/courses" ? true : false;
  console.log(isCoursesRoute);
  const [showNavbarContent, setShowNavbarContent] = useState(false);
  return (
    <nav className="w-full fixed top-0 right-0 left-0 z-50 flex flex-col items-center justify-center text-gray-200  backdrop-blur-3xl">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-8 sm:px-10 backdrop-blur-3xl py-6 rounded-md">
        <div>
          <p className="font-semibold text-base sm:text-lg md:text-xl">Neura</p>
        </div>
        {!isCoursesRoute && (
          <ul className={`hidden sm:flex items-center gap-3`}>
            <li>Home</li>
            <li>Pricing</li>
            <li>Blogs</li>
            <li onClick={() => router.push("/courses")}>Courses</li>
          </ul>
        )}
        {isCoursesRoute ? (
          <div>
            <button className="button w-30 px-2 py-1 transition duration-300 delay-75 flex items-center justify-center gap-2 group">
              <p>Join Now</p>
              <div>
                <FiChevronsRight className="hidden text-black group-hover:block transition-transform duration-300 delay-75" />
              </div>
            </button>
          </div>
        ) : (
          <>
            <div className="hidden sm:block">
              <button className="button w-30 px-2 py-1 transition duration-300 delay-75 flex items-center justify-center gap-2 group">
                <p>Join Now</p>
                <div>
                  <FiChevronsRight className="hidden text-black group-hover:block transition-transform duration-300 delay-75" />
                </div>
              </button>
            </div>
            <div
              onClick={() => setShowNavbarContent(!showNavbarContent)}
              className={`block sm:hidden rotate-180 cursor-pointer hover:text-green-600 active:text-green-600 transition duration-300 delay-75 ${
                showNavbarContent ? "text-green-500" : ""
              }`}
            >
              {showNavbarContent ? (
                <FaBarsStaggered className="rotate-180" size={18} />
              ) : (
                <FaBarsStaggered size={18} />
              )}
            </div>
          </>
        )}
      </div>
      {!isCoursesRoute && (
        <div className="w-full flex sm:hidden items-center justify-center fixed filter backdrop-blur-3xl top-16 gap-2 transition-transform duration-500 delay-100">
          {showNavbarContent && (
            <motion.ul
              initial={{ x: -500 }}
              animate={{ x: 0 }}
              transition={{
                duration: 0.5,
              }}
              className="w-[80%] mx-auto flex flex-col gap-3 text-sm xs:text-base"
            >
              <li className="w-full bg-[#18365593] rounded-md text-center hover:bg-[#183655bd] active:bg-[#183655bd] hover:text-green-700 active:text-green-700 py-1 cursor-pointer transition duration-300 delay-75">
                Home
              </li>
              <li
                onClick={() => {
                  router.push("/courses");
                  setShowNavbarContent(false);
                }}
                className="w-full bg-[#18365593] rounded-md text-center hover:bg-[#183655bd] active:bg-[#183655bd] hover:text-green-700 active:text-green-700 py-1 cursor-pointer transition duration-300 delay-75"
              >
                Courses
              </li>
              <li className="w-full bg-[#18365593] rounded-md text-center hover:bg-[#183655bd] active:bg-[#183655bd] hover:text-green-700 active:text-green-700 py-1 cursor-pointer transition duration-300 delay-75">
                Pricing
              </li>
              <li className="w-full bg-[#18365593] rounded-md text-center hover:bg-[#183655bd] active:bg-[#183655bd] hover:text-green-700 active:text-green-700 py-1 cursor-pointer transition duration-300 delay-75">
                Blogs
              </li>
              <button className="button w-full px-6 py-1 transition duration-300 delay-75 flex items-center justify-center gap-2 group">
                <p>Join Now</p>
              </button>
            </motion.ul>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
