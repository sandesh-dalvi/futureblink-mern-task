import express from "express";

import {
  askAI,
  saveInteraction,
  getAllInteractions,
} from "../controllers/interaction.js";

const router = express.Router();

// AI Interaction Route
router.route("/ask-ai").post(askAI);

// Save Interaction Route
router.route("/save-interaction").post(saveInteraction);

// Get All Interactions
router.route("/interactions").get(getAllInteractions);

export default router;
