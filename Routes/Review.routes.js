import express from "express";

import {
  createReview,
  getReviews,
  deleteReview,
} from "../controllers/review.controller.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

/* ALL REVIEWS */
router.get("/", getReviews);

/* CREATE */
router.post("/", auth, createReview);

/* DELETE */
router.delete("/:id", auth, deleteReview);

export default router;
