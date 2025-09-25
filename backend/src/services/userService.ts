import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//Data Transfer Object
interface registerDto {
  name: string;
  email: string;
  password: string;
}

interface loginDto {
  email: string;
  password: string;
}

export const register = async ({ name, email, password }: registerDto) => {
  const findUser = await userModel.findOne({ email });

  if (findUser) return { status: 409, data: "Email already exists!" };//checks is user exists

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();
    return { status: 200, data: generateJWT({ name, email }) };
  } catch (error) {
    return { status: 500, data: "Failed to register" };
  }
};

export const login = async ({ email, password }: loginDto) => {
  const findUser = await userModel.findOne({ email });//find user by email

  if (!findUser) return { status: 401, data: "Incorrect email or password!" };

  const passwordMatch = await bcrypt.compare(password, findUser.password);

  if (!passwordMatch)//compares
    return { status: 401, data: "Incorrect email or password!" };

  return { status: 200, data: generateJWT({ name: findUser.name, email }) };
};

const generateJWT = (data: { name: string; email: string }) => {
  return jwt.sign(data, process.env.JWT_SECRET || "");
};
