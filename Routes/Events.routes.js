import express from "express";

import {
  createEvent,
  getEvents,
  getEvent,
  joinEvent,
  deleteEvent,
} from "../controllers/event.controller.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getEvents);

router.get("/:id", getEvent);

router.post("/", auth, createEvent);

router.post("/:id/join", auth, joinEvent);

router.delete("/:id", auth, deleteEvent);

export default router;
