import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import productRoutes from "./routes/product.routes.js";
import shopRoutes from "./routes/shop.routes.js";
import eventRoutes from "./routes/event.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import favoriteRoutes from "./routes/favorite.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import messageRoutes from "./routes/message.routes.js";

dotenv.config();

const app = express();

/* DB */
connectDB();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json({ limit: "10mb" }));

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/products", productRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/messages", messageRoutes);

/* HEALTH */
app.get("/", (req, res) => {
  res.json({ app: "ZotPro", status: "online" });
});

/* 404 */
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
