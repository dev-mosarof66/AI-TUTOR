
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/db";
import Course from "@/models/module.models";

connectDB();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json(
        { success: false, message: "Missing search query" },
        { status: 400 }
      );
    }

    const matchedCourses = await Course.find({
      title: { $regex: query, $options: "i" }
    });

    return NextResponse.json({ success: true, data: matchedCourses }, { status: 200 });
  } catch (error) {
    console.error("Error during course search:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
