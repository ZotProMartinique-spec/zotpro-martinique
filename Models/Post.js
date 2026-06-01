import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    caption: { type: String, required: true },
    likes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
