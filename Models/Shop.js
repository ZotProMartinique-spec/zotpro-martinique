import mongoose from "mongoose";

export default mongoose.model(
  "Shop",
  new mongoose.Schema(
    {
      name: String,
      category: String,
      description: String,
      owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
  )
);
