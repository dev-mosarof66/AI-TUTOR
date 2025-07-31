/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CldUploadWidget } from "next-cloudinary";
import axios from "axios";

export default function UploadImageToDB() {
  const handleUpload = async (info: any) => {
    const imageUrl = info?.secure_url;
    const publicId = info?.public_id;

    console.log("Uploaded:", imageUrl, publicId);

    try {
      await axios.post("/api/save-image", {
        imageUrl,
        publicId,
      });

      alert("Image saved to DB!");
    } catch (err) {
      console.error("Error saving image:", err);
    }
  };

  return (
    <CldUploadWidget
      uploadPreset="neura-preset"
      onSuccess={(result) => {
        console.log(result);
        handleUpload(result?.info); // pass image info directly
      }}
    >
      {({ open }) => (
        <button
          onClick={() => open?.()}
          className="bg-purple-500 text-white px-4 py-2 rounded-md"
        >
          Upload Image
        </button>
      )}
    </CldUploadWidget>
  );
}
