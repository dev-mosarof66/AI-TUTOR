import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/db";
import Outline from "@/models/outline.models";
import mongoose from "mongoose";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();

    const { id } = params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const deleted = await Outline.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Outline not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Outline deleted successfully." },
      { status: 200 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Delete failed:", error.message);
    return NextResponse.json(
      { message: "Failed to delete outline." },
      { status: 500 }
    );
  }
};
