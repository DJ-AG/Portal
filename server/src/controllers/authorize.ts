import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import asyncErrorHandler from "../middleware/asyncErrorHandler";


export const verifyToken = asyncErrorHandler(async (req: Request, res: Response) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Token is required" });
    }

    const decoded: jwt.JwtPayload = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;

    const user = await User.findById(decoded.id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    // Optionally include additional user information in the response
    res.status(200).json({ user: { id: user._id, email: user.email } });
});
