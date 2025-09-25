import express from "express";
import { login, register } from "../services/userService"; 
import { body } from "express-validator"; 
import validateBodyData from "../middlewares/validateBodyData"; 

const router = express.Router();

router.post(
  "/register",
  validateBodyData([
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 characters long"),
  ]), 
  async (req, res) => {
    const data = req.body;
    try {
      const result = await register(data); // Calls service to create user and return JWT token

      if (result.status >= 400)
        return res.status(result.status).json({ message: result.data }); // Handles service errors

      res.status(200).json({ token: result.data }); 
    } catch (error) {
      res.status(500).json({ message: "Failed to register", error }); 
    }
  }
);


router.post(
  "/login",
  validateBodyData([
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 characters long"),
  ]), 
  async (req, res) => {
    const data = req.body;
    try {
      const result = await login(data); 

      if (result.status >= 400)
        return res.status(result.status).json({ message: result.data }); 

      res.status(200).json({ token: result.data }); // Return JWT token on successful login
    } catch (error) {
      res.status(500).json({ message: "Failed to login", error }); 
    }
  }
);

export default router; 
