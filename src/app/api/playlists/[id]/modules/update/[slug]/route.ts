import { NextRequest, NextResponse } from "next/server";
import Playlist from "@/models/playlist.models";
import Module from '@/models/module.models'
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/dbConfig/db";

connectDB();

export const PUT = async (
    req: NextRequest,
    { params }: { params: { id: string, slug: string } }
) => {
    try {
        const { id: playlistId, slug: moduleId } = await params;
        console.log(playlistId, moduleId)
        const formData = await req.formData();
        console.log(formData)
        const title = formData.get("title") as string;
        const video = formData.get("video") as File;
        const duration = formData.get("duration") as string;
        const links = formData.get("links") as string;


        if (!moduleId) {
            return NextResponse.json(
                {
                    message: "Network error. Check your internet connection.",
                    success: false
                },
                { status: 400 }
            );
        }

        if (!title && !video && !links) {
            return NextResponse.json(
                {
                    message: "No changes detected.",
                },
                { status: 401 }
            );
        }


        const existedPlaylist = await Playlist.findById({ _id: playlistId });
        console.log(existedPlaylist);

        if (!existedPlaylist) {
            return NextResponse.json(
                {
                    message: "Playlist not found.",
                    data: null,
                },
                { status: 404 }
            );
        }

        const existingModule = await Module.findById(moduleId);
        if (!existingModule) {
            return NextResponse.json(
                {
                    message: "Module not found.",
                    data: null,
                },
                { status: 404 }
            );
        }

        // update fields
        existingModule.title = title;
        existingModule.duration = duration;
        existingModule.links = links;

        // optional video replacement
        if (video) {
            const buffer = await video.arrayBuffer();
            const mime = video.type;
            const encoded = Buffer.from(buffer).toString("base64");
            const dataUri = `data:${mime};base64,${encoded}`;

            const upload = await cloudinary.uploader.upload(dataUri, {
                folder: "modules",
                resource_type: "video",
                chunk_size: 6000000,
                overwrite: true,
                public_id: existingModule._id.toString(),
            });

            console.log("upload", upload);

            if (!upload) {
                console.log("error while saving the module video in cloud");
                return NextResponse.json(
                    {
                        message: "Video upload failed.",
                        data: null,
                    },
                    { status: 502 }
                );
            }

            existingModule.video = upload.secure_url;
        }

        await existingModule.save({
            validateBeforeSave: false,
        });

        return NextResponse.json(
            {
                message: `${title} updated successfully.`,
                data: existingModule,
            },
            {
                status: 200
            }
        );
    } catch (error) {
        console.error("Internal server error in module route:", error);
        return NextResponse.json(
            { message: "Server error", error },
            { status: 500 }
        );
    }
};
