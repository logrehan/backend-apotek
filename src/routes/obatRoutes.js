import express from "express";

import {
  getObat,
  createObat,
  updateObat,
  deleteObat,
  getObatById 
} from "../controllers/obatController.js";

const router = express.Router();

router.get("/", getObat);
router.get("/:id", getObatById);
router.post("/", createObat);
router.put("/:id", updateObat);
router.delete("/:id", deleteObat);

export default router;