"use client";
import React from "react";

interface CardProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

const Card = ({ title, children, className = "" }: CardProps) => {
  return (
    <div
      className={`w-full p-5 rounded-xl shadow-md transition-all duration-300 ${className}`}
    >
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
