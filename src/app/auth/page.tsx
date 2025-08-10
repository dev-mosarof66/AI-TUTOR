"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import {
  handleEmailLogin,
  handleEmailSignup,
  handleGoogleLogin,
} from "@/helper/handleGoogleOauth";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { checkUserAuth } from "@/features/user/userSlice";

const AuthForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.theme);
  const { user, loading } = useAppSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState({
    password: false,
  });

  const handleOuthButton = async () => {
    try {
      const user = await handleGoogleLogin();
      if (user) {
        await axios.post("/api/auth", {
          email: user.email,
        });
        toast.success(`Welcome ${user.displayName || "back"}!`, {
          position: "top-right",
        });
        router.push("/courses");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("error in handle google login : ", error);
    }
  };
  const handleOuth = async () => {
    const userData = {
      email,
      password,
    };
    let user;
    try {
      if (activeTab === "signin") {
        user = await handleEmailLogin(userData);
        if (user) {
          toast.success(`Welcome back!`, {
            position: "top-right",
          });
          router.push("/courses");
        }
      } else {
        user = await handleEmailSignup(userData);

        if (user) {
          await axios.post("/api/auth", {
            email,
          });
          toast.success(`Welcome back!`, {
            position: "top-right",
          });
          router.push("/courses");
        }
      }
    } catch (error) {
      console.log("error in auth frontend: ", error);
    }
  };

  //retrieve the user info

  useEffect(() => {
    dispatch(checkUserAuth());

    if (user) {
      router.push("/courses");
    } else {
      router.push("/auth");
    }
  }, [dispatch, router, user]);

  if (loading) {
    return (
      <div
        className={`w-full h-screen flex flex-col items-center justify-center ${
          isDarkMode ? "bg-gray-800" : "bg-gray-300"
        }`}
      >
        <span className="loading loading-ring loading-xl"></span>
        <p className="w-full text-center my-4 text-purple-600">
          Fetching user data...
        </p>
      </div>
    );
  }

  return (
    <div
      className={`w-full h-screen flex items-center justify-center ${
        isDarkMode ? "bg-gray-800" : "bg-gray-300"
      }`}
    >
      <div className="w-[90%] max-w-md mx-auto mt-10 p-6 bg-green-400/10 rounded-lg shadow-xl shadow-purple-400/20 backdrop-blur-sm">
        {/* tabs  */}
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

        {/* form  */}
        <form className="space-y-6 my-6">
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

          <div className="relative">
            <input
              type={showPassword.password ? "text" : "password"}
              placeholder="Choose password"
              className={`w-full px-3 py-2 border-none outline-none ring ${
                isDarkMode
                  ? "ring-purple-300/30 placeholder:text-gray-400 text-gray-400"
                  : "ring-purple-400/60 placeholder:text-gray-500 text-gray-700"
              } focus:ring-purple-500 rounded `}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div>
              {showPassword.password ? (
                <FaEyeSlash
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      password: !prev.password,
                    }))
                  }
                  className="absolute top-3 right-4 text-gray-600 hover:text-gray-600/60 active:text-gray-600/70 cursor-pointer transition duration-300 delay-75"
                />
              ) : (
                <FaEye
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      password: !prev.password,
                    }))
                  }
                  className="absolute top-3 right-4 text-gray-600 hover:text-gray-600/60 active:text-gray-600/70 cursor-pointer transition duration-300 delay-75"
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

        <div className="mt-4">
          <Button
            variant="outlined"
            disabled={loading}
            color="secondary"
            onClick={handleOuthButton}
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
