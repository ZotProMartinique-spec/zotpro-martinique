import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

/* ================= PUBLIC ================= */
router.get("/", getProducts);
router.get("/:id", getProduct);

/* ================= PROTECTED ================= */
router.post("/", auth, createProduct);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

export default router;
