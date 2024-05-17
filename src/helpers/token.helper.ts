import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { uuid } from "uuidv4";
import jwt from "jsonwebtoken";
import { IPayload } from "../interfaces/IPayload";

export function generatePayload(id: mongoose.Types.ObjectId): IPayload {
  const sessionId: string = uuid();
  const payload: IPayload = {
    id: id,
    sessionId: sessionId,
  };
  return payload;
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const secretKey = process.env.JWT_SECRET_KEY as string;
  const authHeader: string | undefined = req.headers["authorization"];
  const token: string | undefined = authHeader && authHeader.split(" ")[1];
  !token
    ? res
        .status(401)
        .json({ ok: false, msg: "acceso no autorizado, sin token" })
    : jwt.verify(token, secretKey, (error) => {
        if (error) {
          return res.status(401).json({
            ok: false,
            msg: "acceso no autorizado, token expirado o invalido",
          });
        }
        next();
      });
}
