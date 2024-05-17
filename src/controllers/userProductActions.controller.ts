import { Request, Response } from "express";
import userSchema from "../models/user.models";
import productsSchema from "../models/products.model";

export const AddFavorites = async (req: Request, res: Response): Promise<void> => {
	try {
		const {id} = req.params;
		const {productId} = req.body;
		id === undefined || id === null ? res.status(406).json({ok: false, msg: "id params invalid"}) : true;
		productId === undefined || productId === null ? res.status(406).json({ok: false, msg: "product id invalid"}) : true;
		const user = await userSchema.findById(id);
		const favorite = await productsSchema.findById(productId);
		!user || !favorite ? res.status(404).json({ok:false, msg: "usuario o producto no encontrado"}) : true;
		user?.wishList.includes(productId) ? res.status(409).json({ok: false, msg: "el producto ya se encuentra en la lista"}) : user?.wishList.push(productId);
		user?.save();
	} catch (error) {
		console.error(`Error al agregar favorito ${error}`);
		res.status(500).json({ok: false, msg: `Error al agregar favorito: ${error}`})
	}
}