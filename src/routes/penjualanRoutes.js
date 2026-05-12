import express from "express";

import {
  checkoutPenjualan,
  getRiwayatPenjualan,
} from "../controllers/penjualanController.js";

const router = express.Router();

router.post("/checkout", checkoutPenjualan);
router.get("/pelanggan/:id", getRiwayatPenjualan);

export default router;
