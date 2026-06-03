import Post from "../models/Post.js";
import { calculateScore } from "../utils/feedScore.js";

export const createPost = async (req, res) => {
  const post = await Post.create({
    user: req.user.id,
    content: req.body.content
  });

  res.json(post);
};

export const getPosts = async (req, res) => {
  const posts = await Post.find().populate("user");

  const ranked = posts
    .map(p => ({ ...p._doc, score: calculateScore(p) }))
    .sort((a, b) => b.score - a.score);

  res.json(ranked);
};
