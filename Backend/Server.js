import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import shopRoutes from "./routes/shop.routes.js";
import productRoutes from "./routes/product.routes.js";
import postRoutes from "./routes/post.routes.js";
import eventRoutes from "./routes/event.routes.js";
import messageRoutes from "./routes/message.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import favoriteRoutes from "./routes/favorite.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.error("❌ MongoDB:", err));

app.get("/", (req, res) => {
  res.json({
    app: "ZotPro'Martinique",
    status: "online",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/products", productRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/favorites", favoriteRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
