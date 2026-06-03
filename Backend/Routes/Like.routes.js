import express from "express";
import { toggleLike } from "../controllers/like.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/:id", auth, toggleLike);

export default router;
