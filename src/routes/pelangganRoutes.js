import express from "express";

import {
  getPelanggan,
  createPelanggan,
  updatePelanggan,
  deletePelanggan,
} from "../controllers/pelangganController.js";

const router = express.Router();

router.get("/", getPelanggan);
router.post("/", createPelanggan);
router.put("/:id", updatePelanggan);
router.delete("/:id", deletePelanggan);

export default router;
