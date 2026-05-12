import express from "express";

import {
  getJenisObat,
  createJenisObat,
  updateJenisObat,
  deleteJenisObat,
} from "../controllers/jenisObatController.js";

const router = express.Router();

router.get("/", getJenisObat);
router.post("/", createJenisObat);
router.put("/:id", updateJenisObat);
router.delete("/:id", deleteJenisObat);

export default router;
