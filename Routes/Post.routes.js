import express from "express";
import {
  createPost,
  getPosts,
  toggleLike,
  addComment,
} from "../controllers/post.controller.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

/* PUBLIC FEED */
router.get("/", getPosts);

/* CREATE POST */
router.post("/", auth, createPost);

/* LIKE / UNLIKE */
router.post("/:id/like", auth, toggleLike);

/* COMMENT */
router.post("/:id/comment", auth, addComment);

export default router;
