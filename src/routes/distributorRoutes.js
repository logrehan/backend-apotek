import express from "express";

import {
  getDistributor,
  createDistributor
} from "../controllers/distributorController.js";

const router = express.Router();

router.get("/", getDistributor);
router.post("/", createDistributor);

export default router;