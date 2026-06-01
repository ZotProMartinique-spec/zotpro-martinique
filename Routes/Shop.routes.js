import express from "express";
import {
  createShop,
  getShops,
  getShop,
  updateShop,
  deleteShop
} from "../controllers/shop.controller.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

/* ================= PUBLIC ================= */
router.get("/", getShops);
router.get("/:id", getShop);

/* ================= PROTECTED ================= */
router.post("/", auth, createShop);
router.put("/:id", auth, updateShop);
router.delete("/:id", auth, deleteShop);

export default router;
