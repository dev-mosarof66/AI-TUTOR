import { NextRequest } from "next/server"
import { NextResponse } from "next/server";
import Playlist from "@/models/playlist.models";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/dbConfig/db";



connectDB()

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const thumbnail = formData.get("thumbnail") as File;
        const category = formData.get("category") as string;

        if (!title || !thumbnail) {
            return NextResponse.json({
                message: 'Title and thumbanil are required.'
            }, { status: 401 })
        }

        // save the thumbail to cloudinary

        const newPlaylist = new Playlist({
            title,
            description,
            level: category
        })
        console.log(newPlaylist)

        if (!newPlaylist) {
            console.log("error while creating new playlist")
            return NextResponse.json({
                message: 'Network error. Check your internet connection.',
                data: null
            }, { status: 402 })
        }

        const buffer = await thumbnail.arrayBuffer();
        const mime = thumbnail.type;
        const encoded = Buffer.from(buffer).toString('base64')
        const dataUri = `data:${mime};base64,${encoded}`;


        const upload = await cloudinary.uploader.upload(dataUri, {
            folder: 'thumbnails',
            resource_type: "image",
            public_id: newPlaylist._id.toString()
        })

        if (!upload) {
            console.log("error while saving the thumbnail in cloud")
            return NextResponse.json({
                message: 'Network error. Check your internet connection.',
                data: null
            }, { status: 402 })
        }

        newPlaylist.thumbnail = upload.secure_url;



        await newPlaylist.save({
            validateBeforeSave: false
        })

        console.log(newPlaylist)

        return NextResponse.json({
            message: `Playlist created successfully.`,
            data: newPlaylist
        }, { status: 201 })


    } catch (error) {
        console.error("Internal server error in playlist route:", error);
        return NextResponse.json(
            { message: "Server error", error },
            { status: 500 }
        );
    }

}