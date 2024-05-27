import { Request, Response } from "express";
import { IProducts } from "../interfaces/IProducts";
import productsSchema from "../models/products.model";
import { productsValidations } from "../helpers/productsValidations.helper";

export const AddProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, price, category, stock, photoUrl } =
      req.body as IProducts;
    const validationsResults: Record<string, boolean> = {
      isValidName: productsValidations.validateName(name),
      isValidDescription: productsValidations.validateDescription(description),
      isValidPrice: productsValidations.validatePrice(price),
      isValidCategory: productsValidations.validateCategory(category),
      isValidStock: productsValidations.validateStock(stock),
      isValidPhoto:
        photoUrl !== undefined
          ? productsValidations.validatePhoto(photoUrl)
          : true,
    };
    const hasError: boolean = Object.values(validationsResults).some(
      (isValid) => !isValid
    );
    if (hasError) {
      res.status(400).json({
        ok: false,
        msg: "Error en alguno de los datos agregados, uno o mas son invalidos",
      });
      return;
    }
    const newProduct = await productsSchema.create({
      name,
      description,
      price,
      category,
      stock,
      photoUrl,
    });
    res.status(200).json({
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

export const GetAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const maxElement: number = 10;
  const { page } = req.query;
  try {
    const pageNumber = page ? Number(page) : 1
    const products = await productsSchema
      .find()
      .skip(maxElement * (pageNumber - 1))
      .limit(maxElement);
    if(!products.length){
      res.status(404).json({ok:false, msg: 'Productos no encontrados'})
      return
    }
    res.status(200).json({ok:true, data: products, msg: 'Peticion exitosa'})
  } catch (error) {
    console.error(`Error al realizar la peticion ${error}`)
    res.status(500).json({ok:false, msg: `Error al realizar la peticion ${error}`})
  }
};

export const UpdateProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    const { name, description, price, category, stock, photoUrl } =
      req.body as IProducts;
    const validationsResults: Record<string, boolean> = {
      isValidName: productsValidations.validateName(name),
      isValidDescription: productsValidations.validateDescription(description),
      isValidPrice: productsValidations.validatePrice(price),
      isValidCategory: productsValidations.validateCategory(category),
      isValidStock: productsValidations.validateStock(stock),
      isValidPhoto:
        photoUrl !== undefined
          ? productsValidations.validatePhoto(photoUrl)
          : true,
    };
    const hasError: boolean = Object.values(validationsResults).some(
      (isValid) => !isValid
    );
    if (hasError) {
      res.status(400).json({
        ok: false,
        msg: "Error en alguno de los datos actualizados, uno o mas son invalidos",
      });
      return;
    }
    const updateProduct = await productsSchema.findByIdAndUpdate(
      productId,
      {
        ...req.body,
        updatedAt: new Date(),
      },
      { new: true }
    );
    !updateProduct
      ? res.status(404).json({ ok: false, msg: "producto no encontrado" })
      : true;
    res.status(200).json({
      ok: true,
      updatedProduct: updateProduct,
      msg: "producto actualizado con éxito",
    });
  } catch (error) {
    console.error(`Error al actualizar producto ${error}`);
    res
      .status(400)
      .json({ ok: false, msg: `Error al actualizar el producto ${error}` });
  }
};

export const VirtualDelProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    const { virtual_delete } = req.body as IProducts;
    const deleteProduct = await productsSchema.findByIdAndUpdate(
      productId,
      { virtual_delete: virtual_delete },
      { new: true }
    );
    if (!deleteProduct) {
      res.status(404).json({ ok: false, msg: "Producto no encontrado" });
      return;
    }
    res.status(200).json({
      ok: true,
      data: deleteProduct,
      msg: "Producto eliminado con exito",
    });
  } catch (error) {
    console.error(`Error al borrar producto ${error}`);
    res
      .status(400)
      .json({ ok: false, msg: `Error al borrar el producto ${error}` });
  }
};
