import express from "express";

// Import controller functions
import {verifyToken, handleSSO, fowardUser} from "../controllers/authorize";

// Import protect middleware for authentication
import { protect } from "../utils/middleware";

const router = express.Router();

router.use(protect)

router.post("/verifyToken", verifyToken);

router.post("/handleSSO", handleSSO)

router.get("/fowardUser", fowardUser)

export default router;