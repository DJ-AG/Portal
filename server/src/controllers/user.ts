import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncErrorHandler from "../middleware/asyncErrorHandler";
import User, { IUser } from "../models/user";
import { sendTokenResponse } from "./authenticate";
import * as config from "../utils/config";

//Generate random password
export function generateRandomPassword() {

    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

    let password = "";

    while (!passwordValidation(password)) {
      password = "";
      for (let i = 0; i < 10; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }

    return password;
  }

//Password validation
  export function passwordValidation(password: string) {

    return password.length >= 10 &&
           /[A-Z]/.test(password) && // Checks for at least one uppercase letter
           /[0-9]/.test(password) && // Checks for at least one number
           /[^A-Za-z0-9]/.test(password); // Checks for at least one special character
  }


// @desc    Register user
// @route   POST /api/user/createUser
// @access  Public
export const createUser = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { firstname, lastname, email, role } = req.body;
  
      // email validation
      const emailValid = /@edu\.hel\.fi$/.test(email) || /@hel\.fi$/.test(email);
      if (!emailValid) return res.status(400).json({ error: "Email must end with @edu.hel.fi or @hel.fi"});
  
      // Generate a random password
      const password = generateRandomPassword();
  
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("User already exists!")
  
      // Create a new user
      const user: IUser = await User.create({
        firstname,
        lastname,
        email,
        password,
        role,
      });
  
      sendTokenResponse(user, 200, res);
    }
  );

// @desc    Get all user
// @route   GET /api/user/getUser
// @access  Private

  export const getUser = asyncErrorHandler(async (req:Request, res:Response, next:NextFunction) => {

    const user = await User.findById(req.params.id);

    res.status(200).json({ success: true, data: user });

  });

// @desc    Get all user
// @route   GET /api/user/getUsers
// @access  Private

  export const getUsers = asyncErrorHandler(async (req:Request, res:Response, next:NextFunction) => {

    const users = await User.find();

    res.status(200).json({ success: true, data: users });

  });

// @desc    Update user
// @route   PUT /api/user/updateUser
// @access  Private
export const updateUser = asyncErrorHandler(async (req:Request, res:Response, next:NextFunction) => {

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: user });
  });

// @desc    Delete user
// @route   DELETE /api/user/deleteUser
// @access  Private
export const deleteUser = asyncErrorHandler(async (req:Request, res:Response, next:NextFunction) => {

    const user = await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: {} });
  });

