
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/db";
import User from "@/models/user.models";
import Course from "@/models/module.models";

connectDB();

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    const user = await User.findById(userId).populate("enrolledCourses");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }


    return NextResponse.json(
      { success: true, data: user.enrolledCourses },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
