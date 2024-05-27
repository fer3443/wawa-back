import { Request, Response } from "express";
import userSchema from "../models/user.models";
import productsSchema from "../models/products.model";
//functions to favorites management
export const AddFavorites = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { productId } = req.body;
    if (id === undefined || id === null) {
      res.status(406).json({ ok: false, msg: "id params invalid" });
      return;
    }
    if (productId === undefined || productId === null) {
      res.status(406).json({ ok: false, msg: "productId invalid" });
      return;
    }
    const user = await userSchema.findById(id);
    const favorite = await productsSchema.findById(productId);
    if (!user || !favorite) {
      res
        .status(404)
        .json({ ok: false, msg: "usuario o producto no encontrado" });
      return;
    }
    if (user.wishList.includes(productId)) {
      res
        .status(409)
        .json({ ok: false, msg: "el producto ya se encuentra en la lista" });
      return;
    }
    user.wishList.push(productId);
    user.save();
    res.status(200).json({ok:true, data: user, msg: 'Producto agregado a favoritos'})
  } catch (error) {
    console.error(`Error al agregar favorito ${error}`);
    res
      .status(500)
      .json({ ok: false, msg: `Error al agregar favorito: ${error}` });
  }
};

export const DeleteFavorites = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { productId } = req.body;
    if (id === undefined || id === null) {
      res.status(406).json({ ok: false, msg: "id params invalid" });
      return;
    }
    if (productId === undefined || productId === null) {
      res.status(406).json({ ok: false, msg: "productId invalid" });
      return;
    }
    const user = await userSchema.findById(id);
    if (!user) {
      res.status(404).json({ ok: false, msg: "usuario no encontrado" });
      return;
    }
    if (!user?.wishList.includes(productId)) {
      res
        .status(404)
        .json({ ok: false, msg: "producto no encontrado en su wishList" });
      return;
    }
    user.wishList = user.wishList.filter(
      (favorite) => favorite.toString() !== productId
    );
    await user.save();
    res.status(200).json({ ok: true, msg: "favorito eliminado con éxito" });
  } catch (error) {
    console.error(`Error al eliminar favorito ${error}`);
    res
      .status(500)
      .json({ ok: false, msg: `Error al eliminar favorito ${error}` });
  }
};

export const GetFavorites = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (id === undefined || id === null) {
      res.status(406).json({ ok: false, msg: "id params invalid" });
      return;
    }
    const user = await userSchema.findById(id).populate('wishList')
    if (!user) {
      res.status(404).json({ ok: false, msg: "usuario no encontrado" });
      return;
    }
    if (user.wishList === null || user.wishList === undefined) {
      res.status(404).json({ ok: false, msg: "wishList vacia" });
      return;
    }
    res
      .status(200)
      .json({ ok: true, data: user.wishList, msg: "peticion realizada con exito" });
  } catch (error) {
    console.error(`Error al realizar la peticion: ${error}`);
    res
      .status(500)
      .json({ ok: false, msg: `Error al realizar la peticion: ${error}` });
  }
};
//Cart Functions
export const AddCartProducts = async (req: Request, res: Response):Promise<void> => {
  try {
    const { id } = req.params;
    const { productId, stock } = req.body;
    if (id === undefined || id === null) {
      res.status(406).json({ ok: false, msg: "id params invalid" });
      return;
    }
    if (productId === undefined || productId === null) {
      res.status(406).json({ ok: false, msg: "productId invalid" });
      return;
    }
    const user = await userSchema.findById(id).populate('cart');
    if(!id){
      res.status(404).json({ok:false, msg: 'usuario no encontrado'})
      return
    }
    const addCartProduct = await productsSchema.findById(productId);
    if(!addCartProduct){
      res.status(404).json({ok:false, msg: 'producto no encontrado'})
      return
    }
    if(user?.cart.includes(productId)){
      res.status(409).json({ok:false, msg: 'El producto ya se encuentra en su carrito'})
      return
    }
    user?.cart.push({productId, quantity:stock})
    user?.save()
    res.status(200).json({ok:true, data: user, msg:'Producto agregado al carrito'})
  } catch (error) {
    console.error(`Error al agregar el producto al carrito ${error}`)
    res.status(500).json({ok:false, msg: `Error al agregar el producto al carrito ${error}`})
  }
}

export const GetCartProducts = async (req: Request, res: Response):Promise<void> => {
  try {
    const {id} = req.params;
    if (id === undefined || id === null) {
      res.status(406).json({ ok: false, msg: "id params invalid" });
      return;
    }
    const user = await userSchema.findById(id).populate('cart');
    if(!user){
      res.status(404).json({ok:false, msg: 'usuario no encontado'})
      return;
    }
    if (user.cart === null || user.cart === undefined) {
      res.status(404).json({ ok: false, msg: "cart vacio" });
      return;
    }
    res.status(200).json({ok:true, data: user.cart, msg: 'Peticion exitosa'})
  } catch (error) {
    console.error(`Error al realizar peticion: ${error}`);
    res.status(500).json({ok:false, msg: `Error al realizar la peticion ${error}`})
  }
}