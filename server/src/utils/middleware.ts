import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncErrorHandler from "../middleware/asyncErrorHandler";
import User, { IUser } from "../models/user";
import * as config from "./config";

const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("---");
  next();
};

const unknownEndpoint = (req: Request, res: Response): void => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(error.message);

  if (error.name === "CastError") {
    res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    res.status(400).send({ error: error.message });
  } else {
    next(error);
  }
};

// Protect routes
const protect = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    // Check for token in Authorization header or cookies
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      // Get token from Authorization header
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      // Get token from cookies
      token = req.cookies.token;
    }

    // If no token is found, return an unauthorized error
    if (!token) {
      return res.status(401).json({ error: "Not authorized, no token provided" });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, config.jwt_secret) as jwt.JwtPayload;

      // Find the user by ID and check if the token is blacklisted
      const user = await User.findById(decoded.id).select("-password");
      if (user && user.isTokenBlacklisted(token)) {
        return res.status(401).json({ error: "Token has been blacklisted" });
      }

      // Attach the user to the request object
      req.user = user as IUser;
      next();
    } catch (error) {
      // Handle any errors during token verification
      console.error("Error in protect middleware:", error);
      res.status(401).json({ error: "Not authorized, token invalid" });
    }
  }
);

// Middleware function to authorize specific user roles for routes
export const authorize = (...roles) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Check if the user's role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      return next(
        new Error(
          `User is not authorized to access this route`
        )
      );
    }

    // Continue to the next middleware or route handler
    next();
  };
};


export { unknownEndpoint, errorHandler, requestLogger, protect };