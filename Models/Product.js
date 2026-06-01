import mongoose from "mongoose";

export default mongoose.model(
  "Post",
  new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      content: String,
      image: String,

      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      comments: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          text: String,
          createdAt: { type: Date, default: Date.now },
        },
      ],

      score: { type: Number, default: 0 },
    },
    { timestamps: true }
  )
);
