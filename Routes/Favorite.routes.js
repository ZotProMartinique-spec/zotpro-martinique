import express from "express";

import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/favorite.controller.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getFavorites);

router.post("/", auth, addFavorite);

router.delete("/:id", auth, removeFavorite);

export default router;
