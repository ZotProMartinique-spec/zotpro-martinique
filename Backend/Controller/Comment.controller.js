import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    const comment = await Comment.create({
      user: req.user.id,
      post: req.params.id,
      text
    });

    await Post.findByIdAndUpdate(req.params.id, {
      $push: { comments: comment._id }
    });

    res.json(comment);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getComments = async (req, res) => {
  const comments = await Comment.find({ post: req.params.id })
    .populate("user", "name");

  res.json(comments);
};
