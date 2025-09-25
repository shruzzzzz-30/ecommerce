import type { IProduct } from "./Product";
///cart interface
export interface ICart {
  _id: string,
  userId: string;
  items: ICartItem[];
  totalAmount: number;
  status: "active" | "completed";
}
//each item in cart
export interface ICartItem {
  _id: string,
  productId: IProduct;
  quantity: number;
}
//update
export interface IUpdateCartItem {
  productId: string;
  quantity: number;
}
