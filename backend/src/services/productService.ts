import { Types } from "mongoose";
import productModel, { IProduct } from "../models/productModel";

export const getProducts = async () => {
  return await productModel.find().lean(); // Fetch all products
};

export const addProduct = async (data: Partial<IProduct>) => {
  const product = new productModel(data);
  return await product.save(); // Save new product to DB
};

export const getProductById = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) return null; // Check valid Mongo ID
  return await productModel.findById(id);
};

export const updateProduct = async (id: string, data: Partial<IProduct>) => {
  if (!Types.ObjectId.isValid(id)) return null;
  return await productModel
    .findByIdAndUpdate(id, data, { new: true, runValidators: true }) // Update and return new document
    .lean();
};

export const deleteProduct = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) return null;
  return await productModel.findByIdAndDelete(id).lean(); // Delete product by ID
};

export const seedInitialProducts = async () => {
  const products = [
    {
      title: "MacBook Pro 16-inch",
      description: "Apple M2 Pro chip, 16GB RAM, 512GB SSD, Space Gray",
      category: "Laptops",
      image: "https://m.media-amazon.com/images/I/81p5n9MO4QL._AC_SL1500_.jpg",
      price: 2499,
      stock: 10,
    },
    {
      title: "Samsung 27-inch 4K Monitor",
      description: "Ultra HD LED monitor, HDMI & DisplayPort",
      category: "Screens",
      image: "https://m.media-amazon.com/images/I/81U-QW2ZqyL._AC_SL1500_.jpg",
      price: 399,
      stock: 25,
    },
    {
      title: "Sony WH-1000XM5",
      description: "Over-ear noise-cancelling headphones, 30h battery life",
      category: "Headphones",
      image: "https://m.media-amazon.com/images/I/41JACWT-wWL._AC_SL1200_.jpg",
      price: 399,
      stock: 20,
    },
  ];

  try {
    const existingProducts = await getProducts();
    if (existingProducts.length === 0) {
      await productModel.insertMany(products); // Seed initial products if DB is empty
    }
  } catch (error) {
    console.log("Seeding error", error);
  }
};
