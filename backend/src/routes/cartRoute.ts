import express from "express";
import {
  addToCart,
  checkout,
  clearCart,
  deleteCartItem,
  getActiveCart,
  updateCartItem,
} from "../services/cartService"; 
import validateJWT from "../middlewares/validateJWT"; 
import { ExtendRequest } from "../types/extendedRequest"; // Custom request type that extends Express.Request to include 'user'

const router = express.Router();

/// GET active cart for logged-in user
router.get("/", validateJWT, async (req: ExtendRequest, res) => {
  // Middleware 
  try {
    const cart = await getActiveCart({ userId: req.user?._id }); // Service fetches cart from DB
    if (!cart) return res.status(404).json({ message: "Cart not found" }); 
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart", error });
  }
});

/// DELETE entire cart for logged-in user
router.delete("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const cart = await clearCart(req.user?._id); 
    if (!cart) return res.status(404).json({ message: "Cart not found!" });
    res.json(cart); 
  } catch (error) {
    res.status(500).json({ message: "Failed to clear cart", error });
  }
});

/// POST - Add product to cart
router.post("/items", validateJWT, async (req: ExtendRequest, res) => {
  const { productId, quantity } = req.body; // Data sent from frontend
  try {
    const result = await addToCart({
      userId: req.user?._id, // Current logged-in user
      productId,
      quantity,
    });

    if (result.status >= 400)
      return res.status(result.status).json({ message: result.data }); // Handles errors from service layer

    res.status(201).json(result.data); // Success: returns updated cart
  } catch (error) {
    res.status(500).json({ message: "Failed to add to cart", error });
  }
});

/// PUT - Update cart item quantity
router.put("/items", validateJWT, async (req: ExtendRequest, res) => {
  const { productId, quantity } = req.body;
  try {
    const result = await updateCartItem({
      userId: req.user?._id,
      productId,
      quantity,
    });

    if (result.status >= 400)
      return res.status(result.status).json({ message: result.data });

    res.json(result.data); // Returns updated cart item info
  } catch (error) {
    res.status(500).json({ message: "Failed to update cart item", error });
  }
});

/// DELETE - Remove a specific item from cart
router.delete(
  "/items/:productId",
  validateJWT,//middleware
  async (req: ExtendRequest, res) => {
    const { productId } = req.params;

    if (!productId)
      return res.status(400).json({ message: "Missing required productId" }); 

    try {
      const result = await deleteCartItem({ userId: req.user?._id, productId });

      if (result.status >= 400)
        return res.status(result.status).json({ message: result.data });

      res.json(result.data); // Returns updated cart after deletion
    } catch (error) {
      res.status(400).json({ message: "Failed to delete cart item", error });
    }
  }
);

/// POST - Checkout the cart
router.post("/checkout", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const result = await checkout({
      userId: req.user?._id, // Current logged-in user
      address: req.body.address, 
    });

    if (result.status >= 400) // Handles errors from service layer
      return res.status(result.status).json({ message: result.data });

    res.json(result.data); // Returns order confirmation / payment info
  } catch (error) {
    res.status(500).json({ message: "Failed to checkout" });
  }
});

export default router; 
