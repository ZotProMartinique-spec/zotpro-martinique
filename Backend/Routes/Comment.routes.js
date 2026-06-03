import express from "express";
import { addComment, getComments } from "../controllers/comment.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/:id", auth, addComment);
router.get("/:id", getComments);

export default router;
