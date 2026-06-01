import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

/* ================= ROUTES ================= */
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import shopRoutes from "./routes/shop.routes.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();

/* ================= CONFIG ================= */
const PORT = process.env.PORT || 3000;

/* ================= MIDDLEWARE ================= */
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* ================= LOG REQUESTS ================= */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

/* ================= DATABASE ================= */
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI manquant");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connecté");
  } catch (error) {
    console.error("❌ DB error:", error.message);
    process.exit(1);
  }
};

await connectDB();

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);

/* 👇 USERS MODULE (ICI) */
app.use("/api/users", userRoutes);

app.use("/api/posts", postRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/products", productRoutes);

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.status(200).json({
    name: "ZotPro SaaS",
    status: "online",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    uptime: process.uptime(),
  });
});

/* ================= 404 ================= */
app.use((req, res) => {
  res.status(404).json({ error: "Route introuvable" });
});

/* ================= START ================= */
app.listen(PORT, () => {
  console.log(`🚀 ZotPro SaaS running on port ${PORT}`);
});
