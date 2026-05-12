import express from "express";

import {
  getPembelian,
  createPembelian
} from "../controllers/pembelianController.js";

const router = express.Router();

router.get("/", getPembelian);
router.post("/", createPembelian);

export default router;