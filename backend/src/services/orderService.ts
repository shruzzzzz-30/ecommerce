import { orderModel } from "../models/order.model";

// Fetch all orders for a specific user
export const getOrders = async (userId: string) => {
  return await orderModel.find({ userId }).lean(); // Returns user's orders from DB
};
