import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()

const app = express();

app.set('PORT', process.env.PORT || 5000)

app.use(morgan('dev'));
app.use(cors());
app.use(express.json())

import './database/database'

app.listen(app.get('PORT'), () => {
    console.log(`Servidor ejecutandose en puerto ${app.get('PORT')}` )
});