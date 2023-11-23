import express from "express";

// Import controller functions
import {verifyToken} from "../controllers/authorize";

// Import protect middleware for authentication
import { protect } from "../utils/middleware";

const router = express.Router();

router.use(protect)

router.post("/verifyToken", verifyToken);

export default router;