import mongoose, { Document, Schema, Types } from "mongoose";

const CartStatusEnum = ["active", "completed"];//status can only be one of these
///for one pdt
export interface ICartItem {
  productId: Types.ObjectId;
  quantity: number;
}
//whole shopping cart
export interface ICart extends Document {
  userId: Types.ObjectId;
  items: ICartItem[];//array of pdts
  totalAmount: number;
  status: "active" | "completed";
}
//one pdt schema in cart
const cartItemSchema = new Schema<ICartItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1, min: 1, required: true },
});
//whole cart schema
const cartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [cartItemSchema],
  totalAmount: { type: Number, default: 0, required: true },
  status: { type: String, enum: CartStatusEnum, default: "active" },
});
//model creation

const cartModel = mongoose.model<ICart>("Cart", cartSchema);

export default cartModel;
