import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";
import { connectDB } from "@/dbConfig/db";
import * as jose from "jose";

connectDB();



export const POST = async (req: NextRequest) => {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { message: "Email is required", data: null },
                { status: 400 }
            );
        }

        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return NextResponse.json(
                { message: "User with this email already exists", data: null },
                { status: 409 }
            );
        }

        const user = await User.create({ email });
        if (!user) {
            return NextResponse.json(
                { message: "Failed to create user", data: null },
                { status: 500 }
            );
        }

        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

        const token = await new jose.SignJWT({ id: user._id })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("7d")
            .sign(secretKey);

        const res = NextResponse.json(
            { message: "User created successfully", data: user },
            { status: 201 }
        );

        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: "/"
        });

        return res;
    } catch (error) {
        console.error("Error in POST /user", error);
        return NextResponse.json(
            { message: "Internal server error", data: null },
            { status: 500 }
        );
    }
};

export const GET = async (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json(
                { message: "Login session expired.", data: null },
                { status: 401 }
            );
        }

        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jose.jwtVerify(token, secretKey);

        const user = await User.findById(payload.id);
        console.log("user in /auth : ", user)
        if (!user) {
            return NextResponse.json(
                { message: "User not found", data: null },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "User retrieved successfully", data: user },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in GET /user", error);
        return NextResponse.json(
            { message: "Invalid or expired token", data: null },
            { status: 401 }
        );
    }
};
