import Post from "../models/Post.js";

/* SCORE FUNCTION */
const calcScore = (post) => {
  const engagement =
    post.likes.length * 2 + post.comments.length * 3;

  const hours =
    (Date.now() - new Date(post.createdAt)) / 36e5;

  return engagement / (hours + 2);
};

/* CREATE */
export const createPost = async (req, res) => {
  const post = await Post.create({
    user: req.user.id,
    content: req.body.content,
    image: req.body.image,
  });

  res.status(201).json(post);
};

/* FEED (ALGO) */
export const getPosts = async (req, res) => {
  const posts = await Post.find()
    .populate("user", "name")
    .sort({ createdAt: -1 });

  const ranked = posts
    .map((p) => ({
      ...p.toObject(),
      score: calcScore(p),
    }))
    .sort((a, b) => b.score - a.score);

  res.json(ranked);
};

/* LIKE */
export const toggleLike = async (req, res) => {
  const post = await Post.findById(req.params.id);

  const userId = req.user.id;

  if (post.likes.includes(userId)) {
    post.likes = post.likes.filter((id) => id != userId);
  } else {
    post.likes.push(userId);
  }

  await post.save();
  res.json(post);
};

/* COMMENT */
export const addComment = async (req, res) => {
  const post = await Post.findById(req.params.id);

  post.comments.push({
    user: req.user.id,
    text: req.body.text,
  });

  await post.save();
  res.json(post);
};
