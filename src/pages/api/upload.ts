import type { NextApiRequest, NextApiResponse } from "next";
import { parseForm } from "@/lib/middleware";
import cloudinary from "@/lib/cloudinary";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

type NextApiRequestWithFile = NextApiRequest & { file?: { path: string } };

export  async function handler(req: NextApiRequestWithFile, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method not allowed");

  try {
    await parseForm(req, res);

    const filePath = req.file?.path;

    if (!filePath) return res.status(400).json({ success: false, message: "No file uploaded" });


    const result = await cloudinary.uploader.upload(filePath, {
      folder: "uploads",
    });

    fs.unlinkSync(filePath);

    res.status(200).json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
}
