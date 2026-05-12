import express from "express";

import {
  getKeranjang,
  addKeranjang,
  updateKeranjang,
  deleteKeranjang
} from "../controllers/keranjangController.js";

const router = express.Router();

router.get("/:id_pelanggan", getKeranjang);
router.post("/", addKeranjang);
router.put("/:id", updateKeranjang);
router.delete("/:id", deleteKeranjang);

export default router;