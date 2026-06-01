import express from "express";
import {
  createPost,
  getPosts,
  toggleLike,
  addComment,
} from "../controllers/post.controller.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, createPost);
router.post("/:id/like", auth, toggleLike);
router.post("/:id/comment", auth, addComment);

export default router;
