import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config()

const saltRound = parseInt(process.env.SALT!);

export const Encrypt = async (password:string):Promise<string> => {
  return await bcrypt.hash(password, saltRound) 
}

export const Compare = async (password:string, hash:string):Promise<boolean> => {
	return await bcrypt.compare(password, hash)
}