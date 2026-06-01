import express from "express";
import {
  createPost,
  getPosts,
  toggleLike,
  addComment,
  deletePost,
  getPostById,
} from "../controllers/post.controller.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

/* ================= PUBLIC FEED ================= */
router.get("/", getPosts);

/* ================= SINGLE POST ================= */
router.get("/:id", getPostById);

/* ================= PROTECTED ================= */

/* CREATE POST */
router.post("/", auth, createPost);

/* LIKE / UNLIKE */
router.post("/:id/like", auth, toggleLike);

/* COMMENT */
router.post("/:id/comment", auth, addComment);

/* DELETE POST */
router.delete("/:id", auth, deletePost);

export default router;
