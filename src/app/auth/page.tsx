"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import {
  loginWithGoogle,
  signupWithEmail,
  signinWithEmail,
  logout,
} from "@/helper/auth";
import axios from "axios";

const AuthForm = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (activeTab === "signin") {
        await signinWithEmail(email, password);
      } else {
        const response = await signupWithEmail(email, password);
        console.log("Google email singup respone:", response);
        if (response) {
          const res = await axios.post("/api/auth", {
            email: response.email,
            name: response.name,
            avatar: response.photoUrl,
          });

          if (res.status === 201) {
            console.log("User created successfully:", res.data);
            localStorage.setItem("isNewUser", JSON.stringify(false));
            router.push("/courses");
          }
        }
      }
    } finally {
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const response = await loginWithGoogle();
      console.log("Google response:", response);
      if (response) {
        const res = await axios.post("/api/auth", {
          email: response.email,
          name: response.name,
          avatar: response.photoUrl,
        });

        if (res.status === 201) {
          console.log("User created successfully:", res.data);
          localStorage.setItem("isNewUser", JSON.stringify(false));
          router.push("/courses");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-800">
      <div className="w-[90%] max-w-md mx-auto mt-10 p-6 rounded-lg shadow-2xl bg-white dark:bg-gray-900">
        {/* Tabs */}
        <div className="flex mb-4">
          <div
            onClick={() => setActiveTab("signin")}
            className={`flex-1 py-2 text-center border-b-2 ${
              activeTab === "signin"
                ? "border-purple-500 font-bold text-purple-700"
                : "border-transparent text-gray-800 dark:text-gray-200"
            } hover:bg-purple-500/20 cursor-pointer transition duration-300`}
          >
            Sign In
          </div>
          <div
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-2 text-center border-b-2 ${
              activeTab === "signup"
                ? "border-purple-500 font-bold text-purple-700"
                : "border-transparent text-gray-800 dark:text-gray-200"
            } hover:bg-purple-500/20 cursor-pointer transition duration-300`}
          >
            Sign Up
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleEmailAuth} className="space-y-6 my-6">
          <input
            type="email"
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border-none outline-none ring ring-purple-400/50 text-gray-700 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-purple-500 rounded"
          />

          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border-none outline-none ring ring-purple-400/50 text-gray-700 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-purple-500 rounded"
            />
            <div>
              {passwordVisible ? (
                <FaEyeSlash
                  onClick={() => setPasswordVisible(false)}
                  className="absolute top-3 right-4 text-gray-600 hover:text-gray-600/70 cursor-pointer transition duration-300"
                />
              ) : (
                <FaEye
                  onClick={() => setPasswordVisible(true)}
                  className="absolute top-3 right-4 text-gray-600 hover:text-gray-600/70 cursor-pointer transition duration-300"
                />
              )}
            </div>
          </div>

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

        {/* Google Button */}
        <div className="mt-4">
          <Button
            variant="outlined"
            disabled={loading}
            color="secondary"
            onClick={handleGoogleAuth}
            className="w-full border flex items-center justify-center gap-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FcGoogle size={20} />
            <div className="flex items-center gap-1">
              {activeTab === "signin" ? "Sign in" : "Sign up"}{" "}
              <p className="hidden sm:block">with Google</p>
            </div>
          </Button>
        </div>

        {/* Signout Button */}
        <div className="mt-4">
          <Button
            variant="text"
            color="error"
            onClick={logout}
            className="w-full"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
