import mongoose, { Document, Schema } from "mongoose";
//interface for user document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}
//schema

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
//creating model
const userModel = mongoose.model<IUser>("User", userSchema);

export default userModel;
