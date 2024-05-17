export interface IProducts {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}