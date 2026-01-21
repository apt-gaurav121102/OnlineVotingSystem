import express from "express";
const router = express.Router();
import {
  createCandidate,
  getCandidates,
  updateCandidate,
  deleteCandidate
} from "../controllers/candidateController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";


router.get("/", authMiddleware, getCandidates);
router.post("/", authMiddleware, roleMiddleware(["admin"]), createCandidate);
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateCandidate);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteCandidate);


export default router;
