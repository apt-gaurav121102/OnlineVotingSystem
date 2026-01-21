import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { vote } from "../controllers/userController.js";

const router = express.Router();

router.post("/vote", authMiddleware, roleMiddleware(["user"]), vote);

export default router;

