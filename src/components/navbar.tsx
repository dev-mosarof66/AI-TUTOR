"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaBarsStaggered } from "react-icons/fa6";
import { FiChevronsRight } from "react-icons/fi";
import { X } from "lucide-react";
import { CustomButton } from "./ui/custom-button";
import { motion } from "motion/react";
import { useAppSelector } from "@/app/hooks";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = usePathname();
  const { user } = useAppSelector((state) => state.user);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Pricing", path: "/pricing" },
    { name: "Blogs", path: "/blogs" },
  ];

  const isActive = (path: string) => location === path;

  if (user) {
    return null;
  }

  return (
    <motion.nav
      initial={{
        y: -100,
      }}
      animate={{
        y: 0,
        transition: {
          duration: 0.5,
        },
      }}
      className="fixed top-0 w-full z-50 backdrop-blur-2xl"
    >
      <div className="max-w-7xl mx-auto p-4 sm:px-16 ">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-xl  font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Neura
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`block text-sm font-medium transition-all duration-300 delay-75 hover:text-primary ${
                  isActive(item.path) ? "text-primary" : "text-gray-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Join Button */}

          <CustomButton
            router="/auth"
            className="hidden sm:block button text-sm px-2 py-1"
          >
            <div className="flex items-center justify-center gap-1">
              Join Now
              <FiChevronsRight size={16} />
            </div>
          </CustomButton>

          {/* Mobile menu button */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={`block sm:hidden cursor-pointer text-blue-600 hover:text-blue-700 active:text-blue-800 transition duration-300 delay-75`}
          >
            {isOpen ? <X size={24} /> : <FaBarsStaggered size={20} />}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="sm:hidden w-full flex flex-col items-center justify-center">
            <div className="w-full px-2 pt-2 pb-3 space-y-1  mt-2 rounded-lg  flex flex-col items-center justify-center">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`block px-3 py-2 text-base font-medium transition-all duration-300 delay-75 hover:text-primary ${
                    isActive(item.path) ? "text-primary" : "text-gray-300"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <CustomButton
                router="/auth"
                className="w-[80%] flex items-center justify-center mx-auto px-6 py-1  active:scale-[0.98]"
              >
                Join Now
              </CustomButton>
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
