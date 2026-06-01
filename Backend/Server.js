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
    origin: "*", // en prod → ton domaine
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* ================= LOG REQUESTS ================= */
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

/* ================= DB CONNECT ================= */
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI manquant");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connecté");
  } catch (err) {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  }
};

await connectDB();

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);   // 👈 AJOUT IMPORTANT
app.use("/api/posts", postRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/products", productRoutes);

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.status(200).json({
    name: "ZotPro SaaS",
    version: "1.0.0",
    status: "online",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

/* ================= 404 HANDLER ================= */
app.use((req, res) => {
  res.status(404).json({
    error: "Route introuvable",
  });
});

/* ================= START SERVER ================= */
app.listen(PORT, () => {
  console.log(`🚀 ZotPro SaaS running on port ${PORT}`);
});
