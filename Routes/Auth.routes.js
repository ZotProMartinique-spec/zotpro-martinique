import express from "express";
import { toggleFollow } from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/follow/:id", auth, toggleFollow);

export default router;
