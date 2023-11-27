import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import asyncErrorHandler from "../middleware/asyncErrorHandler";
import axios from "axios";
import * as config from "../utils/config";


export const verifyToken = asyncErrorHandler(async (req: Request, res: Response) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Token is required" });
    }
        const decoded = jwt.verify(token, config.jwt_secret);

        res.status(200).json({ valid: true, decoded });

});




export const handleSSO = asyncErrorHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {

        return res.status(401).send({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, config.jwt_secret, { expiresIn: '1h' });

    // Replace with the actual external service URL and necessary payload
    const externalServiceResponse = await axios.post('https://external-service.com/api/auth', { token });

    // Handle the response from the external service
    res.json({ success: true, message: 'Logged in successfully', data: externalServiceResponse.data });

});

export const fowardUser = asyncErrorHandler(async (req: Request, res: Response) => {

        const user = await User.findById(req.params.id);
    
        res.status(200).json({ success: true, data: user });
    
      });