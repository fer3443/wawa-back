import mongoose from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: number;
    country?: string;
  };
  numberPhone?: number;
  orderHistory: IOrder[];
  wishList: mongoose.Types.ObjectId[]; //cambiarlo por el array de product.model
  cart: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
  }[];
  roles: IRole[];
  createdAt: Date;
  updatedAt: Date;
}
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
