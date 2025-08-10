import React from "react";
import "../../css/button.css";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  isNav: boolean;
  onClick: () => void;
}

const Button = ({ children, isNav = false, onClick }: ButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`${isNav ? "rounded-sm animate" : "w-full"}`}
    >
      <div
        className={`${
          isNav
            ? "px-2 py-1"
            : "w-[90%] xs:w-52 mx-auto sm:w-60  px-3 py-2  rounded-sm active:scale-95 "
        } bg-gray-800 flex items-center justify-center gap-2 cursor-pointer group transition-all duration-700 delay-75 hover:bg-[rgb(193,228,248)] active:bg-[rgb(193,228,248)] active:text-black hover:text-black font-semibold active:ring-1 ring-green-300  `}
      >
        {children}
      </div>
    </div>
  );
};

export default Button;
