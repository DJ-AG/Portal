import express from "express";

// Import controller functions
import {
  login,
  resetPassword,
  getMe,
  updateDetails,
  updatePassword,
  logout,
  register,
  validateSession
} from "../controllers/authenticate";

// Import protect middleware for authentication
import { protect } from "../utils/middleware";

const router = express.Router();


// Route for user login
router.post("/login", login);

router.post("/register", register);

// Route for validating session
router.get("/validateSession", validateSession);


// Route for handling forgotten passwords
//router.post("/forgotpassword", forgotPassword);

// Route for resetting passwords using a reset token
router.put("/resetpassword/:resettoken", resetPassword);

// Routes below require authentication, so we use the protect middleware
router.use(protect);


// Route for user logout
router.get("/logout", logout);

// Route for getting the authenticated user's details
router.get("/getMe", getMe);

// Route for updating user details
router.put("/updateDetails", updateDetails);

// Route for updating user password
router.put("/updatePassword", updatePassword);

export default router;