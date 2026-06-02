import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

/* ROUTES */
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import shopRoutes from "./routes/shop.routes.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json({ limit: "10mb" }));

/* ================= DATABASE ================= */
connectDB();

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.json({
    app: "ZotPro'Martinique",
    status: "online",
    version: "1.0",
    database: "connected system",
    timestamp: new Date().toISOString(),
  });
});

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/products", productRoutes);

/* ================= 404 HANDLER ================= */
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
