import express from 'express';
import { AddProducts, UpdateProducts } from '../controllers/products.controller';

const router = express.Router();
router.use(express.json());

router.post('/products/add-new-product', AddProducts);
router.put('/products/update/:productId', UpdateProducts)

export default router;