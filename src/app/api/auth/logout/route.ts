import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/db";



connectDB();



export const POST = async () => {
    try {

        const res = NextResponse.json(
            { message: "Logged out successfully", data: null },
            { status: 200 }
        );
        res.cookies.set("token", '');
        return res;

    } catch (error) {
        console.error("Error in logout", error);
        return NextResponse.json(
            { message: "Internal server error", data: null },
            { status: 500 }
        );
    }
};



