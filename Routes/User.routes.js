import express from "express";
import {
  getProfile,
  getUserById,
  updateProfile,
  followUser,
  unfollowUser,
} from "../controllers/user.controller.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

/* PROFILE */
router.get("/me", auth, getProfile);

/* UPDATE */
router.put("/me", auth, updateProfile);

/* USER */
router.get("/:id", getUserById);

/* FOLLOW */
router.post("/:id/follow", auth, followUser);

/* UNFOLLOW */
router.post("/:id/unfollow", auth, unfollowUser);

export default router;
