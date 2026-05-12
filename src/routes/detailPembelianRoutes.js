import express from "express";

import {
  getDetailPembelian,
  createDetailPembelian
} from "../controllers/detailPembelianController.js";

const router = express.Router();

router.get("/", getDetailPembelian);
router.post("/", createDetailPembelian);

export default router;