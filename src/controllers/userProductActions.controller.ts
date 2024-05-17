import { Request, Response } from "express";
import userSchema from "../models/user.models";
import productsSchema from "../models/products.model";

export const AddFavorites = async (req: Request, res: Response): Promise<void> => {
	try {
		const {id} = req.params;
		const {productId} = req.body;
		if(id === undefined || id === null){
			res.status(406).json({ok: false, msg: "id params invalid"})
			return
		}
		if(productId === undefined || productId === null){
			res.status(406).json({ok: false, msg: "productId invalid"})
			return
		}
		const user = await userSchema.findById(id);
		const favorite = await productsSchema.findById(productId);
		if(!user || !favorite){
			res.status(404).json({ok:false, msg: "usuario o producto no encontrado"})
			return
		};
		if(user.wishList.includes(productId)){
			res.status(409).json({ok: false, msg: "el producto ya se encuentra en la lista"})
			return
		}
		user.wishList.push(productId);
		user.save();
	} catch (error) {
		console.error(`Error al agregar favorito ${error}`);
		res.status(500).json({ok: false, msg: `Error al agregar favorito: ${error}`})
	}
}

export const DeleteFavorites = async (req: Request, res: Response):Promise<void> => {
	try {
		const {id} = req.params;
		const {productId} = req.body;
		if(id === undefined || id === null){
			res.status(406).json({ok: false, msg: "id params invalid"})
			return
		}
		if(productId === undefined || productId === null){
			res.status(406).json({ok: false, msg: "productId invalid"})
			return
		}
		const user = await userSchema.findById(id);
		if(!user){
			res.status(404).json({ok: false, msg: "usuario no encontrado"});
			return
		}
		if(!user?.wishList.includes(productId)){
			res.status(404).json({ok: false, msg: "producto no encontrado en su wishList"});
			return
		}
		user.wishList = user.wishList.filter((favorite) => favorite.toString() !== productId);
		await user.save();
		res.status(200).json({ok:true, msg: "favorito eliminado con éxito"});
	} catch (error) {
		console.error(`Error al eliminar favorito ${error}`);
		res.status(500).json({ok: false, msg: `Error al eliminar favorito ${error}`})
	}
}