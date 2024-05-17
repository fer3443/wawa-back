import express from 'express';
import { AddProducts } from '../controllers/products.controller';

const router = express.Router();
router.use(express.json());

router.post('/products/add-new-product', AddProducts);

export default router;