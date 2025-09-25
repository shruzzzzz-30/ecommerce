import mongoose, { Document, Schema } from "mongoose";
//blueprint for obj
export interface IProduct extends Document {
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
  stock: number;
}

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  description: { type: String, trim: true },
  category: { type: String, trim: true, default: "General" },
  image: { type: String, trim: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 0 },
});
//creating model
const productModel = mongoose.model<IProduct>("Product", productSchema);

export default productModel;
