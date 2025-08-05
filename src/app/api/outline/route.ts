import { connectDB } from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import Outline from "@/models/outline.models";



export const POST = async (req: NextRequest) => {
    try {
        // Ensure DB is connected
        await connectDB();

        // Parse request body
        const { title, modules } = await req.json();

        // Validate input
        if (!title || !modules || !Array.isArray(modules)) {
            return NextResponse.json(
                { message: "Invalid format of Outline." },
                { status: 400 }
            );
        }

        // Save to DB
        const newOutline = await Outline.create({ title, modules });


        return NextResponse.json(
            {
                message: "Outline saved successfully.",
                outline: newOutline,
            },
            { status: 201 }
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Failed to save outline:", error.message);
        return NextResponse.json(
            { message: "Internal server error." },
            { status: 500 }
        );
    }
};

export const GET = async () => {
    try {
        await connectDB();

        const outlines = await Outline.find().sort({ createdAt: -1 });

        return NextResponse.json({ outlines }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Failed to fetch outlines:", error.message);
        return NextResponse.json(
            { message: "Failed to fetch outlines." },
            { status: 500 }
        );
    }
};