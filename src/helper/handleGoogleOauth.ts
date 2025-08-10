import { auth } from "@/lib/firebase"; 
import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

import toast from "react-hot-toast";

interface UserDataProps {
    email: string;
    password: string;
    confirmPassword?: string;
}

// Google Login
export const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        return user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        toast.error(error.message || "Google login failed", {
            position: "top-right",
        });
    }
};

// Email Signup
export const handleEmailSignup = async (userData: UserDataProps) => {
    const { email, password, confirmPassword } = userData;

    if (!email || !password || !confirmPassword) {
        return toast.error("All fields are required.", { position: "top-right" });
    }

    if (password !== confirmPassword) {
        return toast.error("Passwords do not match.", { position: "top-right" });
    }

    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;
        toast.success("Account created successfully!", { position: "top-right" });
        return user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        toast.error(error.message || "Signup failed", { position: "top-right" });
    }
};

// Email Login
export const handleEmailLogin = async (userData: UserDataProps) => {
    const { email, password } = userData;

    if (!email || !password) {
        return toast.error("Email and password are required.", {
            position: "top-right",
        });
    }

    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;
        return user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        toast.error(error.message || "Login failed", { position: "top-right" });
    }
};
