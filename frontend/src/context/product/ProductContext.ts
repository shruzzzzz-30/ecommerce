import { createContext, useContext } from "react";
import type { IProduct } from "../../types/Product";

interface IProductContext {
  products: IProduct[];
  addProduct: (data: Partial<IProduct>) => Promise<boolean>;
  updateProduct: (id: string, data: Partial<IProduct>) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
}

export const ProductContext = createContext<IProductContext>({
  products: [],
  addProduct: async () => false,
  updateProduct: async () => false,
  deleteProduct: async () => false,
});

export const useProduct = () => useContext(ProductContext);
