"use client";
import React, { useState } from "react";
import { useAppSelector } from "../hooks";
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";

const AuthForm = () => {
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");
  //   setLoading(true);
  //   try {
  //     if (activeTab === "signin") {
  //       await signInWithEmailAndPassword(auth, email, password);
  //     } else {
  //       await createUserWithEmailAndPassword(auth, email, password);
  //     }
  //   } catch (err: any) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleGoogleLogin = async () => {
  //   try {
  //     setLoading(true);
  //     await signInWithPopup(auth, googleProvider);
  //   } catch (err: any) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div
      className={`w-full h-screen flex items-center justify-center ${
        isDarkMode ? "bg-gray-800" : "bg-gray-300"
      }`}
    >
      <div className="w-[90%] max-w-md mx-auto mt-10 p-6 bg-green-400/10 rounded-lg shadow-xl shadow-purple-400/20 backdrop-blur-sm">
        <div className="flex mb-4">
          <div
            onClick={() => setActiveTab("signin")}
            className={`flex-1 py-2 text-center border-b-2 ${
              activeTab === "signin"
                ? "border-purple-500 font-bold text-purple-700"
                : `border-transparent ${
                    isDarkMode ? " text-gray-300" : " text-gray-600"
                  }`
            } hover:bg-purple-500/20 active:bg-purple-500/30 cursor-pointer transition duration-300 delay-75`}
          >
            Sign In
          </div>
          <div
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-2 text-center border-b-2 ${
              activeTab === "signup"
                ? "border-purple-500 font-bold text-purple-700"
                : `border-transparent ${
                    isDarkMode ? " text-gray-300" : " text-gray-600"
                  }`
            } hover:bg-purple-500/20 active:bg-purple-500/30 cursor-pointer transition duration-300 delay-75`}
          >
            Sign Up
          </div>
        </div>

        <form className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <input
            type="email"
            placeholder="johndoe@gmail.com"
            className={`w-full px-3 py-2 border-none outline-none ring ${
              isDarkMode
                ? "ring-purple-300/30 placeholder:text-gray-400 text-gray-400"
                : "ring-purple-400/60 placeholder:text-gray-500 text-gray-700"
            } focus:ring-purple-500 rounded `}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Choose a strong password"
            className={`w-full px-3 py-2 border-none outline-none ring ${
              isDarkMode
                ? "ring-purple-300/30 placeholder:text-gray-400 text-gray-400"
                : "ring-purple-400/60 placeholder:text-gray-500 text-gray-700"
            } focus:ring-purple-500 rounded `}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            disabled={loading}
            variant="contained"
            color="secondary"
            className="w-full"
          >
            {loading
              ? "Processing..."
              : activeTab === "signin"
              ? "Sign In"
              : "Sign Up"}
          </Button>
        </form>

        <div className="mt-4">
          <Button
            variant="outlined"
            disabled={loading}
            color="secondary"
            className="w-full border flex items-center justify-center gap-2 py-2 rounded hover:bg-gray-100"
          >
            <>
              <FcGoogle size={20} />
              <div className="flex items-center gap-1">
                {activeTab === "signin" ? "Sign in" : "Sign up"}{" "}
                <p className="hidden sm:block"> with Google</p>
              </div>
            </>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
