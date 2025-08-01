import { NextRequest, NextResponse } from "next/server";
import Playlist from "@/models/playlist.models";
import Module from '@/models/module.models'
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/dbConfig/db";

connectDB();

export const POST = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        const { id } = await params;
        const formData = await req.formData();
        console.log(formData)
        const title = formData.get("title") as string;
        const video = formData.get("video") as File;
        const duration = formData.get("duration") as string;
        const comments = formData.get("comments") as string;

        if (!title || !video) {
            return NextResponse.json(
                {
                    message: "Title and video are required.",
                },
                { status: 401 }
            );
        }

        // save the video to cloudinary
        const buffer = await video.arrayBuffer();
        const mime = video.type;
        const encoded = Buffer.from(buffer).toString("base64");
        const dataUri = `data:${mime};base64,${encoded}`;

        const upload = await cloudinary.uploader.upload(dataUri, {
            folder: "playlist-thumbnails",
            resource_type: "video",
            chunk_size: 6000000
        });

        console.log('upload', upload)

        if (!upload) {
            console.log("error while saving the module in cloud");
            return NextResponse.json(
                {
                    message: "Network error. Check your internet connection.",
                    data: null,
                },
                { status: 402 }
            );
        }

        const newModule = new Module({
            title,
            duration,
            links: comments,
            video: upload?.secure_url,
        });

        console.log('newmodule', newModule)

        if (!newModule) {
            console.log("error while creating new module");
            return NextResponse.json(
                {
                    message: "Network error. Check your internet connection.",
                    data: null,
                },
                { status: 402 }
            );
        }

        const existedPlaylist = await Playlist.findById({ _id: id })
        console.log(existedPlaylist)

        if (!existedPlaylist) {
            return NextResponse.json(
                {
                    message: "Network error. Check your internet connection.",
                    data: null,
                },
                { status: 402 }
            );
        }

        await existedPlaylist.modules.push(newModule._id)

        await existedPlaylist.save({
            validateBeforeSave: false,

        })

        await newModule.save({
            validateBeforeSave: false,
        });

        return NextResponse.json(
            {
                message: `${title} created successfully.`,
                data: newModule,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Internal server error in module route:", error);
        return NextResponse.json(
            { message: "Server error", error },
            { status: 500 }
        );
    }
};
