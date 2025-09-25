import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";     //route handlers for api end points
import productRoute from "./routes/productRoute";
import { seedInitialProducts } from "./services/productService";///function to populate intial pdt in database
import cartRoute from "./routes/cartRoute";
import cors from 'cors';
import orderRoute from './routes/orderRoute';

dotenv.config();


//create express app
const app = express();
const port = 3000;

//middleware
app.use(express.json());//middlewear
app.use(cors());//allows requests from frontend

//connect to mongodb
mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("Connected!"))
  .catch((err) => console.log("Failed to connect!", err));

seedInitialProducts();//function to populate intial pdt in database

//routes
app.use("/user", userRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/orders", orderRoute)

//start server
app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});
