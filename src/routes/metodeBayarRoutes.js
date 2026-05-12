import express from "express";

import {
  getMetodeBayar,
  createMetodeBayar,
} from "../controllers/metodeBayarController.js";

const router = express.Router();

router.get("/", getMetodeBayar);
router.post("/", createMetodeBayar);

export default router;
