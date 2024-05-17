import { Request, Response } from "express";
import { IProducts } from "../interfaces/IProducts";
import productsSchema from "../models/products.model";
import { productsValidations } from "../helpers/productsValidations.helper";

export const AddProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, price, categoty, stock, photoUrl } =
      req.body as IProducts;
    // const isValidName = productsValidations.validateName(name);
    // const isValidDescription = productsValidations.validateName(description);
    // const isValidPrice = productsValidations.validatePrice(price);
    // const isValidCategory = productsValidations.validateCategory(categoty);
    // const isValidStock = productsValidations.validateStock(stock);
    // if(photoUrl !== undefined) {
    // 	const isValidPhoto = productsValidations.validatePhoto(photoUrl);
    // }
    const validationsResults: Record<string, boolean> = {
      isValidName: productsValidations.validateName(name),
      isValidDescription: productsValidations.validateName(description),
      isValidPrice: productsValidations.validatePrice(price),
      isValidCategory: productsValidations.validateCategory(categoty),
      isValidStock: productsValidations.validateStock(stock),
			isValidPhoto: photoUrl !== undefined ? productsValidations.validatePhoto(photoUrl) : true
    };
		const hasError: boolean = Object.values(validationsResults).some((isValid) => (!isValid));
    if(hasError){
      res.status(400).json({ok:false, msg: 'Error en alguno de los datos agregados, uno o mas son invalidos'})
      return
    }
    const newProduct = await productsSchema.create({
      name,
      description,
      price,
      categoty,
      stock,
      photoUrl,
    });
    res
      .status(200)
      .json({
        ok: true,
        product: newProduct,
        msg: "Producto agregado con éxito",
      });
  } catch (error) {
    console.error(`Error al crear producto ${error}`);
    res
      .status(500)
      .json({ ok: false, msg: `Error al crear producto ${error}` });
  }
};
