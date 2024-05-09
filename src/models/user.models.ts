import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/Iuser";

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: Number || String,
    country: String,
  },
  phoneNumber: String,
  orderHistory: [
    {
      _id: mongoose.Types.ObjectId,
      date: Date,
      total: Number,
      products: [
        {
          product: { type: mongoose.Types.ObjectId, ref: "Product" },
          quantity: Number,
          price: Number,
        },
      ],
      status: String,
      orderAddress: String,
    },
  ],
  wishList: [{ type: mongoose.Types.ObjectId, ref: "Product" }], //luego cambiar esto
  cart: [
    {
      productId: { type: mongoose.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  role: [{ type: String, default: 'costumer'}],
	createdAt: { type: Date, default: Date.now()},
	updatedAt: { type: Date, default: Date.now()}
});

export default mongoose.model('User', userSchema)