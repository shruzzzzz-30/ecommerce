import mongoose, { Document, Schema, Types } from "mongoose";

export interface IOrderItem {
  title: string;
  category: string;
  image: string;
  price: number;
  quantity: number;
}

export interface IOrder extends Document {
  userId: Types.ObjectId;
  items: IOrderItem[];
  total: number;
  address: string;
}
//single 
const orderItemSchema = new Schema<IOrderItem>({
  title: { type: String, required: true },
  category: { type: String },
  image: { type: String },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 1 },
});
//whole order 
const orderSchema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [orderItemSchema],
  total: { type: Number, required: true, min: 0 },
  address: { type: String, required: true },
});

export const orderModel = mongoose.model<IOrder>("Order", orderSchema);
