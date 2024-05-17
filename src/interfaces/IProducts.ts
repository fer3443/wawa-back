export interface IProducts {
  name: string;
  description: string;
  price: number;
  categoty: string;
  stock: number;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}