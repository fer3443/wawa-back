import mongoose, { Model } from "mongoose";


export interface IUserMethods {
  generateAccesToken():string
}

export interface IUser {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  names: IName
  address?: IAddress;
  phoneNumber?: String;
  orderHistory: IOrder[];
  wishList: mongoose.Types.ObjectId[]; //cambiarlo por el array de product.model
  cart: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
  }[];
  role: IRole[] | IRole;
  createdAt: Date;
  updatedAt: Date;
}

export type UserModel = Model<IUser, {}, IUserMethods>

interface IProductInOrder {
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}
type IRole = "admin" | "costumer";

interface IOrder {
  _id: mongoose.Types.ObjectId;
  date: Date;
  total: number;
  products: IProductInOrder[];
  status: "pending" | "shipped" | "delivered" | "cancelled";
  orderAddress: string;
}
export interface IAddress {
  street: string;
  city: string;
  state: string;
  zipCode: number | string;
  country: string;
}
export interface IName {
  firstName:string,
  lastName:string
}
