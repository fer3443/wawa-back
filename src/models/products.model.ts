import mongoose, { Schema } from "mongoose";
import { IProducts } from "../interfaces/IProducts";

const productsSchema = new Schema<IProducts>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  categoty: { type: String, required: true },
  stock: { type: Number, required: true },
  photoUrl: { type: String},
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

productsSchema.set("toJSON", {
  transform(doc, ret) {
    (ret.productId = ret._id),
      delete ret._id,
      delete ret.__v,
      delete ret.createdAt;
  },
});
export default mongoose.model<IProducts>("product", productsSchema);
