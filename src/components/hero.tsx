import { Play, Code, Zap, Globe } from "lucide-react";
import { ReactTyped } from "react-typed";
import { FaVideo } from "react-icons/fa";
import { motion } from "motion/react";

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-24 flex items-center justify-center overflow-hidden bg-gray-300 dark:bg-gray-900 text-gray-900 dark:text-gray-300">
      {/* Background Effects */}

      
      <div  className="absolute top-20 left-96 translate-x-1/2 w-48 h-48 bg-purple-800/30 rounded-full blur-3xl"/>
      <div  className="absolute bottom-20 right-10 -translate-x-1/2 w-48 h-48 bg-purple-800/40 rounded-full blur-3xl"/>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="max-w-lg mx-auto text-4xl bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent sm:text-6xl font-bold">
              Introducing to Neura
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Learn programming with interactive courses, AI-powered assistance,
              and real-world projects. Transform your coding journey today.
            </p>
          </motion.div>

          {/* Interactive Code Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="p-3 sm:p-6 rounded-sm border dark:border-gray-700 shadow-lg bg-purple-800/20">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-left font-mono text-sm sm:text-base">
                <ReactTyped
                  strings={[
                    "const future = await learn()",
                    "function createAmazingApps() {",
                    "Master coding with Neura",
                    "export default YourDreams",
                  ]}
                  typeSpeed={40}
                  backSpeed={50}
                  loop
                />
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full max-w-lg mx-auto flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="w-full sm:w-fit border border-purple-600 text-white hover:bg-purple-700 font-semibold px-6 py-2 active:scale-[0.97] cursor-pointer transition-all duration-300 delay-75 flex items-center justify-center gap-2 group">
              <Play className="h-5 w-5 group-hover:scale-110  transition-all duration-300" />
              Start Learning
            </button>
            <button className="w-full sm:w-fit border border-purple-500 text-white
            hover:border-purple-700 hover:text-purple-700 font-semibold px-6 py-2 flex items-center justify-center gap-2 group cursor-pointer transition-all duration-300 delay-75 active:scale-[0.97]">
              <FaVideo className="h-5 w-5 group-hover:scale-110 transition-all duration-300 delay-75" />
              Watch Demo
            </button>
          </motion.div>

          {/* Feature Icons */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.2 },
              },
            }}
            className="flex justify-center items-center space-x-8 pt-8"
          >
            {[
              { icon: <Code className="h-6 w-6 text-blue-500" />, label: "Interactive" },
              { icon: <Zap className="h-6 w-6 text-yellow-500" />, label: "AI-Powered" },
              { icon: <Globe className="h-6 w-6 text-green-500" />, label: "Real Projects" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="flex flex-col items-center space-y-2 group cursor-pointer"
              >
                <div className="p-3 glass-bg rounded-full group-hover:scale-110 transition-all shadow-md">
                  {item.icon}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
