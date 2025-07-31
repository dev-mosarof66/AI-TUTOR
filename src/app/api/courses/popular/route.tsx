import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/db";
import Course from "@/models/module.models";

connectDB();

export async function GET() {
  try {
    const popularCourses = await Course.find({ popular: true });

    return NextResponse.json(
      { success: true, data: popularCourses },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching popular courses:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
