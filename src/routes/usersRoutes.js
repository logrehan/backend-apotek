import express from "express";

import {
  getUsers,
  createUsers
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUsers);

export default router;