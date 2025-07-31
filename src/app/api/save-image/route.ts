import  { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { connectDB } from "@/dbConfig/db";
import ImageModel from "@/models/image.model";

connectDB();

const POST = async (req: NextRequest) => {

    try {
        const reqBody = await req.json()
        const { imageUrl, publicId } = reqBody
        console.log(imageUrl, publicId)

        const newImage = await ImageModel.create({
            url: imageUrl,
            public_id: publicId,
        });

        return NextResponse.json({
            message: "file saved to db",
            newImage
        }, { status: 200 })
    } catch (error) {
        console.error("Error saving image to DB:", error);
        return NextResponse.json({
            message: "Internal server error",
            data: null
        }, { status: 500 })
    }
}
export { POST }
