import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes.js";
import shopRoutes from "./routes/shop.routes.js";
import productRoutes from "./routes/product.routes.js";
import postRoutes from "./routes/post.routes.js";

dotenv.config();

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors({ origin: "*"}));
app.use(express.json({ limit: "10mb" }));

/* ================= DB ================= */
await mongoose.connect(process.env.MONGO_URI);
console.log("✅ MongoDB connected");

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/products", productRoutes);
app.use("/api/posts", postRoutes);

/* ================= HEALTH ================= */
app.get("/", (req, res) => {
  res.json({ status: "ZotPro SaaS running 🚀" });
});

/* ================= START ================= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🚀 Running on", PORT));
