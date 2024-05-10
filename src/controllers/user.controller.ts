import { Request, Response } from "express";
import { Encrypt, Compare } from '../helpers/password.helper';
import userSchema from "../models/user.models";
import { userValidations } from '../helpers/userValidations.helper';
import { IRequestBody } from "../interfaces/IRequestBody";

export const AddUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, passwordUnHash, names, address, phoneNumber } =
      req.body as IRequestBody;

    //validations
    const existingUser = await userSchema.findOne({ username });
    const isValidUsername = userValidations.validateUsername(username);
    const isValidMail = userValidations.validateMail(email);
    const isValidName = userValidations.validateName(names);
    const isValidPassword = userValidations.validatePassword(passwordUnHash);

    if (existingUser) {
      res
        .status(400)
        .json({
          ok: false,
          msg: "El nombre de usuario ya existe, por favor cree otro",
        });
      return;
    }
    if (!names || !names.firstName || !names.lastName) {
      res.status(400).json({ ok: false, msg: "Nombre o apellido no definido" });
      return;
    }
    if (!isValidName) {
      res
        .status(400)
        .json({
          ok: false,
          msg: "El nombre debe contener al menos 3 caracteres y el apellido al menos dos",
        });
      return;
    }
    if (address !== undefined && address !== null) {
      const isValidAddress = userValidations.validateAddress(address);
      if (!isValidAddress) {
        res.status(400).json({ ok: false, msg: "direccion invalida" });
        return;
      }
    }
    if (phoneNumber !== undefined && phoneNumber !== null) {
      const strNumberPhone: string = String(phoneNumber);
      const isValidNumberPhone =
        userValidations.validatePhoneNumber(strNumberPhone);
      if (!isValidNumberPhone) {
        res.status(400).json({ ok: false, msg: "número de telefono invalido" });
        return;
      }
    }
    if (!isValidUsername) {
      res.status(400).json({ ok: false, msg: "usuario invalido" });
      return;
    }
    if (!isValidMail) {
      res.status(400).json({ ok: false, msg: "mail invalido" });
      return;
    }
    if (!isValidPassword) {
      res.status(400).json({ ok: false, msg: "password invalido" });
      return;
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
    res
      .status(500)
      .json({ ok: false, msg: `error al crear usuario: ${error}` });
  }
};
export const LoginUser = async (req: Request, res: Response): Promise<void> => {
  const msg_error:string = "usuario, email o contraseña incorrectos"
  try {
    const {username, email, passwordUnHash} = req.body;
      if(username){
        const isValidUser = userValidations.validateUsername(username)
        if(!isValidUser){
          res.status(400).json({ok:false, msg: msg_error})
          return
        }else{
          const userLoged = await userSchema.findOne({username})
          if(!userLoged){
            res.status(400).json({ok:false, msg: msg_error})
            return
          }
          const passwordCheck = await Compare(passwordUnHash, userLoged.password);
          if(!passwordCheck){
            res.status(400).json({ok:false,msg:msg_error});
            return
          }
          const token = userLoged.generateAccesToken;
          res.status(200).json({ok: true, user: userLoged, token: token})
        }
      }else if(email){
        const isValidMail = userValidations.validateMail(email)
        if(!isValidMail){
          res.status(400).json({ok: false, msg:msg_error})
          return
        }else{
          const userLoged = await userSchema.findOne({email});
          if(!userLoged){
            res.status(400).json({ok:false, msg: msg_error})
            return
          }
          const passwordCheck = await Compare(passwordUnHash, userLoged.password);
          if(!passwordCheck){
            res.status(400).json({ok:false,msg:msg_error});
            return
          }
          const token = userLoged.generateAccesToken;
          res.status(200).json({ok: true, user: userLoged, token: token})
        }
      }else{
        res.status(400).json({ok:false, msg: "usuario o email no especificados"})
      }
  } catch (error) {
    console.error("Error al iniciar sesion " + error);
    res
      .status(500)
      .json({ ok: false, msg: `error al iniciar sesion: ${error}` });
  }
}