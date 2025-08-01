import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/db";
import Module from "@/models/module.models";

connectDB();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const existedModule = await Module.findOne({ id });

    if (!existedModule) {
      return NextResponse.json(
        { success: false, message: "Module not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: Module }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Module by slug:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
