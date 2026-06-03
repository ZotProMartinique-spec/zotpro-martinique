import express from "express";
import corsConfig from "./config/cors.js";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";

const app = express();

connectDB();

app.use(corsConfig);
app.use(express.json({ limit: "10mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.json({ app: "ZotPro", status: "online" });
});

export default app;
