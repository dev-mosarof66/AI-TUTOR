/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";


const firebaseErrors = [
    { code: "auth/email-already-in-use", message: "This email is already registered." },
    { code: "auth/invalid-email", message: "Please enter a valid email address." },
    { code: "auth/user-disabled", message: "This account has been disabled." },
    { code: "auth/user-not-found", message: "Invalid credentials." },
    { code: "auth/wrong-password", message: "Invalid credentials." },
    { code: "auth/invalid-credential", message: "Invalid credentials." },
    { code: "auth/weak-password", message: "Password should be at least 6 characters long." },
    { code: "auth/popup-closed-by-user", message: "Google sign-in popup was closed." },
    { code: "auth/network-request-failed", message: "Network error. Check your internet connection." },
    { code: "auth/too-many-requests", message: "Too many attempts. Please try again later." },
];



// Helper to get friendly error message
const getErrorMessage = (code: string) => {
    const found = firebaseErrors.find(err => err.code.toString().toLowerCase() === code.toString().toLowerCase());
    return found ? found.message : "Something went wrong. Please try again.";
};

// Google Login
export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        toast.success(`Welcome ${result.user.displayName || "back"}!`, {
            position: "top-right",
        });

        const user = {
            name: result.user.displayName,
            email: result.user.email,
            photoUrl: result.user.photoURL,
        }
        console.log('user in google login', user)
        return user;
    } catch (error: any) {
        toast.error(getErrorMessage(error.code), { position: "top-right" });
        return null;
    }
};

// Email Signup
export const signupWithEmail = async (email: string, password: string) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Account created successfully!", { position: "top-right" });

        const user = {
            name: result.user.displayName,
            email: result.user.email,
            photoUrl: result.user.photoURL,
        }
        console.log('user in google login', user)
        return user;
    } catch (error: any) {
        console.error("Error in signupWithEmail:", error);
        toast.error(getErrorMessage(error.code), { position: "top-right" });
        throw error;
    }
};

// Email Signin
export const signinWithEmail = async (email: string, password: string) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        toast.success("Welcome back!", { position: "top-right" });

        const user = {
            name: result.user.displayName,
            email: result.user.email,
            photoUrl: result.user.photoURL,
        }
        console.log('user in google login', user)
        return user;
    } catch (error: any) {
        console.error("Error in signinWithEmail:", error.code);
        const message = getErrorMessage(error.code);
        console.error("Error message:", message);
        toast.error(message, { position: "top-right" });
        return null;
    }
};

// Signout
export const logout = async () => {
    try {
        await signOut(auth);
        toast.success("Logged out successfully!", { position: "top-right" });
        return true;
    } catch (error: any) {
        toast.error(getErrorMessage(error.code), { position: "top-right" });
        return false;
    }
};

