import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import asyncErrorHandler from "../middleware/asyncErrorHandler";
import User, { IUser } from "../models/user";
import * as config from "../utils/config";

import { generateRandomPassword } from "./user";


// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncErrorHandler(

  async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    // Validate email & password
    
    if (!email) return res.status(400).json({ error: "Email is required" });

    if (!password) return res.status(400).json({ error: "Password is required" });


    email.toLowerCase();

    const user = await User.findOne({ email }).select("+password");


    if (!user)return res.status(401).json({ error: "Invalid credentials" });
    
    // Check if the provided password matches the user's password

    const isMatch = await user.matchPassword(password);

    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
    
    // Generate token
    const token = jwt.sign({ id: user._id, role: user.role }, config.jwt_secret, { expiresIn: config.jwt_expire });

    // Return the token
    res.status(200).json({ token });

  }
);

//desc Log user out / clear cookie
//@route GET /api/auth/logout
//@access Private
export const logout = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    
      const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

      if (!token) {
        return res.status(401).json({ error: "Not authorized, token not found" });
      }

      const decoded = jwt.verify(token, config.jwt_secret) as jwt.JwtPayload;

      const user = await User.findById(req.user.id) as IUser;
      if (user) {
        await user.blacklistToken(token, new Date(decoded.exp * 1000));
      }

      res.cookie("token", "none", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
      });

      res.status(200).json({
        success: true,
        message: "Logout successful",
      });
  }
);

//@desc Get current logged in user
//@route POST /api/auth/getMe
//@access Private
export const getMe = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Find and send the currently authenticated user
    const user = await User.findById(req.user.id);

    res.status(200).json(user);
  }
);

// For testing purposes
export const register = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstname, lastname, email } = req.body;

    // email validation
    const emailValid = /@edu\.hel\.fi$/.test(email) || /@hel\.fi$/.test(email);
    if (!emailValid) return res.status(400).json({ error: "Email must end with @edu.hel.fi or @hel.fi"});

    // Generate a random password
    const password = generateRandomPassword();

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists!")
    console.log(password)
    // Create a new user
    const user: IUser = await User.create({
      firstname,
      lastname,
      email,
      password,
    });

    sendTokenResponse(user, 200, res);
  }
);


//@desc Update user details
//@route PUT /api/auth/updatedetails
//@access Private
export const updateDetails = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Define fields to update based on the request body
    const fieldsToUpdate = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
    };

    // Find and update the user's details
    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    // Respond with the updated user data
    res.status(200).json({
      success: true,
      data: user,
    });
  }
);

//@desc Update password
//@route PUT /api/auth/updatepassword
//@access Private
export const updatePassword = asyncErrorHandler(async (req, res, next) => {
  // Find the user by ID and include the password field
  const user = await User.findById(req.user.id).select("+password");

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Check if the current password matches
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return res.status(401).json({ error: "Password is incorrect" });
  }

  // Set the new password and save the user document
  user.password = req.body.newPassword;

  await user.save();

  // Create a new JWT token for the user and send it in the response
  sendTokenResponse(user, 200, res);
});

// Get token from model, create a cookie, and send a response
export const sendTokenResponse = (
  user: IUser,
  statusCode: number,
  res: Response
) => {
  const token: string = user.getSignedJwtToken();

  const options: {
    expires: Date;
    httpOnly: boolean;
    domain: string;
    secure?: boolean;
    sameSite?: 'lax' | 'strict' | 'none';
  } = {
    expires: new Date(Date.now() + config.jwt_cookie_expire * 24 * 60 * 60 * 1000),
    httpOnly: true,
    domain: '.yourmaindomain.com', // Set your main domain here
    sameSite: 'lax'
  };

  if (config.node_env === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({ success: true, token });
};

// @desc forgot password
// @route POST /api/auth/forgotpassword
// @access Public
// export const forgotPassword = asyncErrorHandler(async (
//   req: Request,
//   res: Response,
//   next: NextFunction
//   ) => {
//   // Find a user by their email
//   const user = await User.findOne({ email: req.body.email });

//   if (!user) {
//     return res.status(404).json({ error: 'There is no user with that email' });
//   }

//   // Generate a reset token and save it to the user document
//   const resetToken = user.getResetPasswordToken();

//   await user.save({ validateBeforeSave: false });

//   // Create a reset URL for the user to use
//   const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`;

//   const message = `You are receiving this email because you
//   (or someone else) has requested the reset of a password.
//   Please make a PUT request to: \n\n ${resetUrl}`;

//   try {
//     // Send an email with the reset instructions
//     await sendEmail({
//       email: user.email,
//       subject: 'Password reset token',
//       message: message,
//     });

//     return res.status(200).json({ success: true, data: 'Email sent' });

//   } catch (error) {
//     console.error(error);
//     // Clear the reset token and expiration if there's an error
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;

//     await user.save({ validateBeforeSave: false });
//     return res.status(500).json({ error: 'Email could not be sent' });
//   }
// });

// @desc Reset password
// @route PUT /api/auth/resetpassword/:resettoken
// @access Public
export const resetPassword = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get hashed token from the URL
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resettoken)
      .digest("hex");

    // Find a user by the reset token and expiration date
    const user = await User.findOne({
      resetPasswordToken: resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Set the new password, clear the reset token and expiration, and save the user document
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    // Create a new JWT

    sendTokenResponse(user, 200, res);
  }
);

export const validateSession = (req, res) => {
  // If the middleware has successfully attached the user object, the session is valid
  if (req.user) {
    console.log('User is authenticated');
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    console.log('User is not authenticated');
    res.json({ isAuthenticated: false });
  }
};