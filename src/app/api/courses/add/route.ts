// File: app/api/courses/add/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/db";
import Course from "@/models/module.models";
import slugify from "slugify";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { title, description, duration, level, lessons, isPopular } = body;

    if (!title || !description || !duration || !level || !lessons) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const slug = slugify(title, { lower: true, strict: true });

    const existingCourse = await Course.findOne({ slug });
    if (existingCourse) {
      return NextResponse.json(
        { success: false, message: "Course with this title already exists" },
        { status: 409 }
      );
    }

    const newCourse = await Course.create({
      title,
      slug,
      description,
      duration,
      level,
      lessons,
      isPopular: isPopular || false,
    });

    return NextResponse.json({ success: true, data: newCourse }, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
