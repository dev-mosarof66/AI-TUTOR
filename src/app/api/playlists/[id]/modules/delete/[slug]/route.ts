import { NextRequest, NextResponse } from "next/server";
import Playlist from "@/models/playlist.models";
import Module from "@/models/module.models";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/dbConfig/db";

connectDB();

export const DELETE = async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string; slug: string }> }
) => {
    try {
        const { id: playlistId, slug: moduleId } = await params;

        if (!moduleId) {
            return NextResponse.json(
                {
                    message: "Network error. Check your internet connection.",
                    success: false,
                },
                { status: 400 }
            );
        }

        const existedPlaylist = await Playlist.findById({ _id: playlistId });
        if (!existedPlaylist) {
            return NextResponse.json(
                {
                    message: "Network error. Check your internet connection.",
                    data: null,
                },
                { status: 404 }
            );
        }

        const existingModule = await Module.findById(moduleId);
        if (!existingModule) {
            return NextResponse.json(
                {
                    message: "Module not found with this id.",
                    data: null,
                },
                { status: 404 }
            );
        }

        const publicId = `modules/${moduleId}`;

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

        existedPlaylist.modules = existedPlaylist.modules.filter(
            (m: string) => m.toString() !== existingModule._id.toString()
        );
        await existedPlaylist.save({ validateBeforeSave: false });

        await existingModule.deleteOne();

        return NextResponse.json(
            {
                message: `${existingModule.title} deleted successfully.`,
                data: existingModule._id.toString(),
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Internal server error in module delete route:", error);
        return NextResponse.json(
            { message: "Server error", error },
            { status: 500 }
        );
    }
};
