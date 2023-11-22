import express from "express";

// Import controller functions
import {
  register,
  login,
  resetPassword,
  getUser,
  updateDetails,
  updatePassword,
  logout
} from "../controllers/auth";

// Import protect middleware for authentication
import { protect } from "../utils/middleware";

const router = express.Router();

// Route for user registration
router.post("/register", register);

// Route for user login
router.post("/login", login);



// Route for handling forgotten passwords
//router.post("/forgotpassword", forgotPassword);

// Route for resetting passwords using a reset token
router.put("/resetpassword/:resettoken", resetPassword);

// Routes below require authentication, so we use the protect middleware
router.use(protect);

// Route for user logout
router.get("/logout", logout);

// Route for getting the authenticated user's details
router.get("/user", getUser);

// Route for updating user details
router.put("/updateDetails", updateDetails);

// Route for updating user password
router.put("/updatePassword", updatePassword);

export default router;