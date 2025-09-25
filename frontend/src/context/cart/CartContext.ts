import { createContext, useContext } from "react";
import type { ICart, IUpdateCartItem } from "../../types/Cart";

interface ICartContext {
  cart: ICart | null;
  addCartItem: (productId: string) => Promise<void>;
  updateCartItem: (data: IUpdateCartItem) => Promise<void>;
  removeCartItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>
  getCart: () => Promise<void>
  checkout: (address: string) => Promise<void>
}

export const CartContext = createContext<ICartContext>({
  cart: null,
  addCartItem: async () => {},
  updateCartItem: async () => {},
  removeCartItem: async () => {},
  clearCart: async () => {},
  getCart: async () => {},
  checkout: async () => {},
});
export const useCart = () => useContext(CartContext);
