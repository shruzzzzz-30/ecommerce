import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import { ExtendRequest } from "../types/extendedRequest";
//middlewear function to validate jwt token from request header
const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authorizationHeader.split(" ")[1];

  //header with tolken //extract token 
  ///if missing 403 
if (!token) {
    return res.status(403).json({ message: "Bearer token not found" });
  }
//verify token
  jwt.verify(token, process.env.JWT_SECRET || "", async (error, payload) => {
    if (error) {
      return res.status(403).json({ message: "Invalid token" });
    }

    if (!payload) {
      return res.status(403).json({ message: "Invalid token payload" });
    }
//extract user data from token 
    const userPayload = payload as { name: string; email: string };
//fetch user from db and attach to req object
    const user = await userModel.findOne({ email: userPayload.email });
    req.user = user;
    next();
  });
};

export default validateJWT;
