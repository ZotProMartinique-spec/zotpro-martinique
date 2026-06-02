import express from "express";

import {
  sendMessage,
  getConversation,
  getInbox,
  markAsRead,
} from "../controllers/message.controller.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

/* SEND */
router.post("/", auth, sendMessage);

/* INBOX */
router.get("/inbox", auth, getInbox);

/* CONVERSATION */
router.get("/:userId", auth, getConversation);

/* READ */
router.put("/:id/read", auth, markAsRead);

export default router;
