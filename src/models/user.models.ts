import mongoose, { Schema, mongo } from "mongoose";
import jwt from "jsonwebtoken";
import { IUser, IUserMethods, UserModel } from '../interfaces/Iuser';
import { generatePayload } from '../helpers/token.helper';

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  names: {
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
          product: { type: mongoose.Types.ObjectId, ref: "Products" },
          quantity: Number,
          price: Number,
        },
      ],
      status: String,
      orderAddress: String,
    },
  ],
  wishList: [{ type: mongoose.Types.ObjectId, ref: "Products" }], //luego cambiar esto
  cart: [
    {
      productId: { type: mongoose.Types.ObjectId, ref: "Products" },
      quantity: Number,
    },
  ],
  role: { type: String, default: 'costumer'},
	createdAt: { type: Date, default: Date.now()},
	updatedAt: { type: Date, default: Date.now()}
});
userSchema.methods.generateAccessToken = function():string{
  const payload = generatePayload(this._id);
  const secretKey = process.env.JWT_SECRET_KEY as string;
  const expirationTime = '1h';
  const token = jwt.sign(payload, secretKey, {expiresIn: expirationTime});
  return token
}

userSchema.set('toJSON', {
  transform: function( doc, retorno ):void {
    retorno.id = retorno._id;
    delete retorno.password;
    delete retorno._id;
    delete retorno.wishList;
    delete retorno.__v;
    delete retorno.address;
    delete retorno.role;
    delete retorno.phoneNumber;
    delete retorno.orderHistory;
    delete retorno.cart;
  }
})
export default mongoose.model<IUser, UserModel>('User', userSchema)