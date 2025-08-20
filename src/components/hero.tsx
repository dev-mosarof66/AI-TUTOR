import { Play, Code, Zap, Globe } from "lucide-react";
import { ReactTyped } from "react-typed";
import { FaVideo } from "react-icons/fa";
import { CustomButton, CustomButtonTwo } from "./ui/custom-button";

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-24 flex items-center justify-center overflow-hidden bg-gray-300 dark:bg-gray-900 text-gray-900 dark:text-gray-300">
      {/* Background Effects */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-purple-600/50 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-600/50 opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="max-w-lg mx-auto text-4xl bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent sm:text-6xl  font-bold">
              Introducing to Neura
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Learn programming with interactive courses, AI-powered assistance,
              and real-world projects. Transform your coding journey today.
            </p>
          </div>

          {/* Interactive Code Display */}
          <div className="max-w-2xl mx-auto">
            <div className="p-3 sm:p-6 rounded-xl border dark:border-gray-700">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-left font-mono text-sm sm:text-base">
                <ReactTyped
                  strings={[
                    "const future = await learn();",
                    "function createAmazingApps() {",
                    "Master coding with Neura",
                    "export default YourDreams;",
                  ]}
                  typeSpeed={40}
                  backSpeed={50}
                  loop
                />
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="w-full max-w-lg mx-auto flex flex-col sm:flex-row gap-4 justify-center items-center">
            <CustomButton
              router="/courses"
              className="w-full sm:w-fit button mx-auto px-6 py-2  active:scale-[0.98] transition duration-300 delay-75 flex items-center justify-center gap-2 group"
            >
              <Play className="h-5 w-5 group-hover:scale-110 group-hover:text-purple-800 transition-all duration-300 delay-75" />
              Start Learning
            </CustomButton>
            <CustomButtonTwo
              router="/"
              className="w-full sm:w-fit  mx-auto px-6 py-2  flex items-center justify-center gap-2 group hover:text-purple-500 "
            >
              <FaVideo className="h-5 w-5 group-hover:scale-110 transition-all duration-300 delay-75" />
              Watch Demo
            </CustomButtonTwo>
          </div>

          {/* Feature Icons */}
          <div className="flex justify-center items-center space-x-8 pt-8">
            <div className="flex flex-col items-center space-y-2 group cursor-pointer">
              <div className="p-3 glass-bg rounded-full group-hover:scale-110 transition-all">
                <Code className="h-6 w-6 text-blue-500" />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Interactive
              </span>
            </div>
            <div className="flex flex-col items-center space-y-2 group cursor-pointer">
              <div className="p-3 glass-bg rounded-full group-hover:scale-110 transition-all">
                <Zap className="h-6 w-6 text-yellow-500" />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                AI-Powered
              </span>
            </div>
            <div className="flex flex-col items-center space-y-2 group cursor-pointer">
              <div className="p-3 glass-bg rounded-full group-hover:scale-110 transition-all">
                <Globe className="h-6 w-6 text-green-500" />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Real Projects
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
