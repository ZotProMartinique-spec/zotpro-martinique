import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

dotenv.config();

const app = express();

/* DB */
connectDB();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json({ limit: "10mb" }));

/* ROUTES SAFE LOAD */
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";

/* OPTIONAL ROUTES (évite crash si pas prêts) */
let productRoutes, shopRoutes, eventRoutes, reviewRoutes, favoriteRoutes, notificationRoutes, messageRoutes;

try { productRoutes = (await import("./routes/product.routes.js")).default; } catch {}
try { shopRoutes = (await import("./routes/shop.routes.js")).default; } catch {}
try { eventRoutes = (await import("./routes/event.routes.js")).default; } catch {}
try { reviewRoutes = (await import("./routes/review.routes.js")).default; } catch {}
try { favoriteRoutes = (await import("./routes/favorite.routes.js")).default; } catch {}
try { notificationRoutes = (await import("./routes/notification.routes.js")).default; } catch {}
try { messageRoutes = (await import("./routes/message.routes.js")).default; } catch {}

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

if (productRoutes) app.use("/api/products", productRoutes);
if (shopRoutes) app.use("/api/shops", shopRoutes);
if (eventRoutes) app.use("/api/events", eventRoutes);
if (reviewRoutes) app.use("/api/reviews", reviewRoutes);
if (favoriteRoutes) app.use("/api/favorites", favoriteRoutes);
if (notificationRoutes) app.use("/api/notifications", notificationRoutes);
if (messageRoutes) app.use("/api/messages", messageRoutes);

/* HEALTH */
app.get("/", (req, res) => {
  res.json({
    app: "ZotPro",
    status: "online"
  });
});

/* 404 */
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
