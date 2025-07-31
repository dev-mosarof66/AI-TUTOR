"use client";
import React, {  useState } from "react";
import {  IconButton } from "@mui/material";
import "../../css/sidebar.css";
import { useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa6";
import { FaStar, FaFire } from "react-icons/fa";
import { MdHome } from "react-icons/md";

const Items = [
  {
    id: 1,
    name: "Home",
    Icon: () => <MdHome size={24} />,
    link: "/courses",
  },
  {
    id: 2,
    name: "Popular",
    Icon: () => <FaStar size={21} />,
    link: "/courses/popular",
  },
  {
    id: 3,
    name: "My Courses",
    Icon: () => <FaFire size={20} />,
    link: "/courses/my-courses",
  },
];
const FloatSidebar = () => {
  const router = useRouter();
  // const isDarkMode = useAppSelector((state) => state.theme.theme);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="block md:hidden">
      <IconButton onClick={() => setIsOpen(!isOpen)} color="secondary">
        <FaBars size={22} />
      </IconButton>
      <div className="w-full  fixed left-0 top-14 z-50 backdrop-blur-2xl">
        <div
          className={`w-[90%] mx-auto flex flex-col gap-2 items-center justify-center text-gray-300`}
        >
          {Items.map((Item) => (
            <>
              {isOpen && (
                <div
                  key={Item.id}
                  onClick={() => {
                    setActiveTab(Item.id);
                    router.push(Item.link);
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center justify-center gap-2 py-2 px-4 ${
                    activeTab === Item.id
                      ? "bg-purple-500/20 hover:bg-purple-500/40 active:bg-purple-500/50 active:scale-95"
                      : "hover:bg-purple-500/20 active:bg-purple-500/30 active:scale-95"
                  }  cursor-pointer transition duration-300 delay-75`}
                >
                  <p>{Item.name}</p>
                </div>
              )}
            </>
          ))}
        </div>
        <div className="w-full h-[1px] my-4 bg-gray-600/50"></div>
      </div>
    </div>
  );
};

export default FloatSidebar;
