import { Types } from "mongoose";
import cartModel from "../models/cartModel";
import productModel from "../models/productModel";
import { IOrderItem, orderModel } from "../models/order.model";

// Fetch active shopping cart for a user
interface GetActiveCart {
  userId: string;
}
export const getActiveCart = async ({ userId }: GetActiveCart) => {
  return await cartModel
    .findOne({ userId, status: "active" })
    .populate("items.productId") // Replace product IDs with actual product details
    .lean();
};

// Add product to cart
interface AddToCart {
  userId: string;
  productId: string;
  quantity: number;
}
export const addToCart = async ({ userId, productId, quantity }: AddToCart) => {
  if (quantity <= 0)
    return { status: 400, data: "Quantity must be greater than 0" };

  const product = await productModel.findById(productId); // Check if product exists
  if (!product) return { status: 404, data: "Product not found!" };
  if (product.stock < quantity) return { status: 400, data: `Only ${product.stock} items available in stock` };

  const cart = await cartModel.findOne({ userId, status: "active" });

  if (!cart) { // Create a new cart if none exists
    const newCart = await cartModel.create({
      userId,
      items: [{ productId, quantity }],
      totalAmount: product.price * quantity,
    });
    await newCart.populate("items.productId");
    return { status: 201, data: newCart };
  }

  const itemIndex = cart.items.findIndex((item) => item.productId.toString() == productId);
  if (itemIndex > -1) return { status: 409, data: "Product already exists in cart" }; // Prevent duplicate

  cart.items.push({ productId: new Types.ObjectId(productId), quantity }); // Add new item
  cart.totalAmount += product.price * quantity; // Update total
  await cart.save();
  const updatedCart = await cart.populate("items.productId");
  return { status: 201, data: updatedCart };
};

// Update cart item quantity
interface updateCartItem {
  userId: string;
  productId: string;
  quantity: number;
}
export const updateCartItem = async ({ quantity, userId, productId }: updateCartItem) => {
  if (quantity <= 0) return { status: 400, data: "Quantity must be greater than 0" };

  const product = await productModel.findById(productId);
  if (!product) return { status: 404, data: "Product not found!" };
  if (product.stock < quantity) return { status: 400, data: `Only ${product.stock} items available in stock` };

  const cart = await cartModel.findOne({ userId, status: "active" });
  if (!cart) return { status: 404, data: "Cart not found!" };

  const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
  if (itemIndex == -1 || !cart.items[itemIndex]) return { status: 400, data: "Item does not exist in cart" };

  cart.totalAmount -= product.price * cart.items[itemIndex].quantity; // Remove old total
  cart.totalAmount += product.price * quantity; // Add new total
  cart.items[itemIndex].quantity = quantity; // Update quantity
  await cart.save();
  const updatedCart = await cart.populate("items.productId");
  return { status: 200, data: updatedCart };
};

// Delete specific cart item
interface DeleteCartItem {
  productId: string;
  userId: string;
}
export const deleteCartItem = async ({ productId, userId }: DeleteCartItem) => {
  const cart = await cartModel.findOne({ userId, status: "active" });
  if (!cart) return { status: 404, data: "Cart not found!" };

  const product = await productModel.findById(productId);
  if (!product) return { status: 404, data: "Product not found!" };

  const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
  if (itemIndex == -1 || !cart.items[itemIndex]) return { status: 400, data: "Item does not exist in cart" };

  cart.totalAmount -= cart.items[itemIndex].quantity * product.price; // Subtract item total
  cart.items.splice(itemIndex, 1); // Remove item
  await cart.save();
  const updatedCart = await cart.populate("items.productId");
  return { status: 200, data: updatedCart };
};

// Clear entire cart
export const clearCart = async (userId: string) => {
  return await cartModel.findOneAndUpdate(
    { userId, status: "active" },
    { $set: { items: [], totalAmount: 0 } }, // Reset items and total
    { new: true }
  );
};

// Checkout cart
interface Checkout {
  userId: string;
  address: string;
}
export const checkout = async ({ userId, address }: Checkout) => {
  if (!address) return { status: 400, data: "Please add the address" };

  const cart = await cartModel.findOne({ userId, status: "active" });
  if (!cart) return { status: 404, data: "Cart not found!" };
  if (cart.items.length === 0) return { status: 400, data: "Cart is empty!" };

  const orderItems: IOrderItem[] = [];

  for (const item of cart.items) {
    const product = await productModel.findById(item.productId);
    if (!product) return { status: 400, data: "Product not found!" };

    product.stock -= item.quantity; // Reduce stock for purchased items
    await product.save();

    orderItems.push({ // Prepare order items
      title: product.title,
      category: product.category,
      image: product.image,
      price: product.price,
      quantity: item.quantity,
    });
  }

  const order = await orderModel.create({
    userId,
    total: cart.totalAmount,
    address,
    items: orderItems,
  });

  cart.status = "completed"; // Mark cart as completed after checkout
  await cart.save();

  return { status: 200, data: order }; // Return order details
};
