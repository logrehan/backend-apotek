import express from "express";

import {
  createPengiriman,
  getPengiriman,
  updateStatusPengiriman,
} from "../controllers/pengirimanController.js";

const router = express.Router();

router.post("/", createPengiriman);
router.get("/", getPengiriman);
router.patch("/:id", updateStatusPengiriman);
router.put("/status/:id", updateStatusPengiriman);

export default router;
