import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/dbConfig/db";
import Playlist from "@/models/playlist.models";

await connectDB();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid playlist ID" },
        { status: 400 }
      );
    }

    const playlist = await Playlist.findById(id).populate("modules");

    if (!playlist) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Network error. Please check your internet connection.",
        },
        { status: 404 }
      );
    }

    const payload = playlist.toObject({ getters: true });

    return NextResponse.json(
      { success: true, data: payload },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching playlist:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
