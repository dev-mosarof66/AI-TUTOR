import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";
import { connectDB } from "@/dbConfig/db";
import * as jose from "jose";

connectDB();



export const POST = async (req: NextRequest) => {
    try {
        const { email, avatar, name } = await req.json();

        console.log("Received data in /api/auth:", { email, avatar, name });

        if (!email) {
            return NextResponse.json(
                { message: "Email is required", data: null },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email });

        //create new token
        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new jose.SignJWT({ id: existingUser?._id })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("365d")
            .sign(secretKey);

        if (existingUser) {
            const res = NextResponse.json(
                { data: existingUser },
                { status: 201 }
            );
            res.cookies.set("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 365, // 365 days
            });
            return res;
        }

        const user = await User.create({ email, avatar, name });
        if (!user) {
            return NextResponse.json(
                { message: "Failed to create user", data: null },
                { status: 500 }
            );
        }

        const res = NextResponse.json(
            { data: user },
            { status: 201 }
        );
        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 365, // 365 days
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
        console.log(token)
        if (!token) {
            return NextResponse.json(
                { message: "Login session expired.", data: null },
                { status: 401 }
            );
        }

        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jose.jwtVerify(token, secretKey);

        if (!payload) {
            return NextResponse.json(
                {
                    message: "Login session expired."
                },
                { status: 402 }
            )
        }

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

export const PUT = async (req: NextRequest) => {
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

        if (!payload) {
            return NextResponse.json(
                { message: "Login session expired." },
                { status: 402 }
            )
        }

        const userId = payload.id;
        const { currentPlan } = await req.json();

        const updatedUser = await User.findByIdAndUpdate(userId, { currentPlan }, { new: true });
        if (!updatedUser) {
            return NextResponse.json(
                { message: "Failed to update user", data: null },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "User updated successfully", data: updatedUser },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in PUT /user", error);
        return NextResponse.json(
            { message: "Internal server error", data: null },
            { status: 500 }
        );
    }
}


export const DELETE = async (req: NextRequest) => {
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

        if (!payload) {
            return NextResponse.json(
                { message: "Login session expired." },
                { status: 402 }
            )
        }

        const userId = payload.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return NextResponse.json(
                { message: "Failed to delete user", data: null },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "User deleted successfully", data: null },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in DELETE /user", error);
        return NextResponse.json(
            { message: "Internal server error", data: null },
            { status: 500 }
        );
    }
};

