import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/db";
import Course from "@/models/module.models";

connectDB();

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const course = await Course.findOne({ slug });

    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: course }, { status: 200 });
  } catch (error) {
    console.error("Error fetching course by slug:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
