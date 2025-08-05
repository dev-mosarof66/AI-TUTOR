// app/api/playlists/[id]/delete/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/db";
import Playlist from "@/models/playlist.models";
import cloudinary from "@/lib/cloudinary"; // v2 configured

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id: playlistId } = await params;
  if (!playlistId) {
    return NextResponse.json({ message: "Playlist ID is required." }, { status: 400 });
  }

  try {
    await connectDB();

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return NextResponse.json({ message: "Playlist not found." }, { status: 404 });
    }

    const publicId = `thumbnails/${playlistId}`;

    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        invalidate: true,
        resource_type: "image",
      });
      console.log("[Cloudinary] destroy result:", result);
      if (result.result !== "ok" && result.result !== "not found") {
        console.warn("Unexpected Cloudinary delete result:", result);
      }
    } catch (cloudErr) {
      console.error("Cloudinary thumbnail deletion failed:", cloudErr);
    }

    await Playlist.deleteOne({ _id: playlistId });

    return NextResponse.json(
      { message: "Playlist deleted successfully", playlistId },
      { status: 200 }
    );
  } catch (err) {
    console.error("[DELETE PLAYLIST] error:", err);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: err instanceof Error ? err.message : null,
      },
      { status: 500 }
    );
  }
};
