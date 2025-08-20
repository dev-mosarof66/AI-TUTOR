import Link from "next/link";
import React, { ReactNode } from "react";

interface Props {
  router: string;
  children: ReactNode;
  className: string;
}

export const CustomButton = ({ router, children, className }: Props) => {
  return (
    <Link
      href={router}
      className={`button ${className} transition duration-300 delay-75`}
    >
      {children}
    </Link>
  );
};

export const CustomButtonTwo = ({ router, children, className }: Props) => {
  return (
    <Link
      href={router}
      className={`border border-[rgb(193, 228, 248)] hover:bg-[rgb(193, 228, 248)] rounded-lg active:scale-[0.98] ${className} transition duration-300 delay-75`}
    >
      {children}
    </Link>
  );
};

