import express from "express";
import validateJWT from "../middlewares/validateJWT"; 
import { ExtendRequest } from "../types/extendedRequest"; 
import { getOrders } from "../services/orderService"; 

const router = express.Router();


router.get("/", validateJWT, async (req: ExtendRequest, res) => {
 
  try {
    const orders = await getOrders(req.user?._id); 

    if (!orders) return res.status(404).json({ message: "Orders not found!" });
   
    res.json(orders); 
  
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
   
  }
});

export default router; 
