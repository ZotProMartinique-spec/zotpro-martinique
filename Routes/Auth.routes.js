import express from "express";
import {
  getUserProfile,
  toggleFollow,
  getMe,
  getSuggestions,
} from "../controllers/user.controller.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

/* ================= CURRENT USER ================= */
router.get("/me", auth, getMe);

/* ================= SUGGESTIONS ================= */
router.get("/suggestions", auth, getSuggestions);

/* ================= PROFILE PUBLIC ================= */
router.get("/:id", getUserProfile);

/* ================= FOLLOW / UNFOLLOW ================= */
router.post("/:id/follow", auth, toggleFollow);

export default router;
