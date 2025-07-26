import Image from "next/image";
import React from "react";
import bg from "../assets/background.gif";
import Navbar from "@/components/custom/navbar";
import Hero from "@/components/custom/hero";
const Home = () => {

  return (
    <div className="w-full min-h-screen">
      <div className="w-full min-h-screen">
        <Image src={bg} className="w-full h-screen" alt="background" />
      </div>

      {/* main content goes here  */}

      <div className="absolute top-0 w-full">
        <div className="w-full mx-auto min-h-screen">
          <Navbar />
          <div>
            <Hero />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
