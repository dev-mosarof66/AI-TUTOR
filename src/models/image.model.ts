// models/image.model.ts
import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: String,
    public_id: String,
  },
  { timestamps: true }
);

export default mongoose.models.Image || mongoose.model("Image", imageSchema);
