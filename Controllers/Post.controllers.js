import Post from "../models/Post.js";
import User from "../models/User.js";

/* SCORE FEED */
const calculateScore = (post) => {
  const engagement =
    post.likes.length * 2 +
    post.comments.length * 3;

  const ageHours =
    (Date.now() - new Date(post.createdAt)) /
    1000 /
    60 /
    60;

  return engagement / (ageHours + 2);
};

/* CREATE POST */
export const createPost = async (req, res) => {
  try {
    const post = await Post.create({
      user: req.user.id,
      content: req.body.content,
      image: req.body.image || "",
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/* FEED */
export const getFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    const ranked = posts
      .map((post) => ({
        ...post.toObject(),
        score: calculateScore(post),
      }))
      .sort((a, b) => b.score - a.score);

    res.json(ranked);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/* GET ONE POST */
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user", "name avatar");

    if (!post) {
      return res.status(404).json({
        error: "Post introuvable",
      });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/* DELETE */
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        error: "Post introuvable",
      });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({
        error: "Accès refusé",
      });
    }

    await post.deleteOne();

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/* LIKE */
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const userId = req.user.id;

    const alreadyLiked = post.likes.some(
      (id) => id.toString() === userId
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/* COMMENT */
export const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    post.comments.push({
      user: req.user.id,
      text: req.body.text,
    });

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
