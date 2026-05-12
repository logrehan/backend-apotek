import express from "express";

import {
  getJenisPengiriman,
  createJenisPengiriman
} from "../controllers/jenisPengirimanController.js";

const router = express.Router();

router.get("/", getJenisPengiriman);
router.post("/", createJenisPengiriman);

export default router;