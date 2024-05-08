import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI as string;

mongoose.set('strictQuery', true);
mongoose
	.connect(mongoUri)
	.then(() => {
		console.log('DataBase conectada');
	})
	.catch(error => {
		console.log(`Error: ${error}`)
	})