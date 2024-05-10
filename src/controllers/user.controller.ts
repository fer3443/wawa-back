import { Request, Response } from "express";
import { Encrypt } from "../helpers/password.helper";
import userSchema from "../models/user.models";
import { userValidations } from "../helpers/userValidations.helper";
import { IRequestBody } from "../interfaces/IRequestBody";
import { IName } from '../interfaces/Iuser';

export const AddUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      username,
      email,
      passwordUnHash,
      names,
      address,
      phoneNumber,
    } = req.body as IRequestBody;

    // //validations
		const existingUser = await userSchema.findOne({ username });
    const isValidUsername = userValidations.validateUsername(username);
    const isValidMail = userValidations.validateMail(email);
		const isValidName = userValidations.validateName(names)
    const isValidPassword = userValidations.validatePassword(passwordUnHash);
		if(existingUser){
			res.status(400).json({ok:false, msg: "El nombre de usuario ya existe, por favor cree otro"})
			return
		}
		if (!names || !names.firstName || !names.lastName) {
			res.status(400).json({ ok: false, msg: "Nombre o apellido no definido" });
			return
		}
		if(!isValidName){
			res.status(400).json({ok:false, msg: "El nombre debe contener al menos 3 caracteres y el apellido al menos dos"})
			return
		}
    if (address !== undefined && address !== null) {
      const isValidAddress = userValidations.validateAddress(address);
      if (!isValidAddress) {
        res.status(400).json({ ok: false, msg: "direccion invalida" });
				return
      }
    }
    if (phoneNumber !== undefined && phoneNumber !== null) {
      const strNumberPhone: string = String(phoneNumber);
      const isValidNumberPhone =
        userValidations.validatePhoneNumber(strNumberPhone);
      if (!isValidNumberPhone) {
        res.status(400).json({ ok: false, msg: "número de telefono invalido" });
				return
      }
    }
    if (!isValidUsername) {
      res.status(400).json({ ok: false, msg: "usuario invalido" });
			return
    }
    if (!isValidMail) {
      res.status(400).json({ ok: false, msg: "mail invalido" });
			return
    }
    if (!isValidPassword) {
      res.status(400).json({ ok: false, msg: "password invalido" });
			return
    }
    const password = await Encrypt(passwordUnHash);
    const newUser = await userSchema.create({
      username,
      email,
      password,
      names,
      address,
      phoneNumber,
    });
    res
      .status(201)
      .json({ ok: true, data: newUser, msg: "usuario creado con exito" });
  } catch (error) {
    console.error("Error al crear usuario " + error);
    res.status(500).json({ ok: false, msg: `error al crear usuario: ${error}` });
  }
};
