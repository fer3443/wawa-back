import express from 'express';
import { AddProducts, UpdateProducts, VirtualDelProduct } from '../controllers/products.controller';
import { authenticateToken } from '../helpers/token.helper';

const router = express.Router();
router.use(express.json());

router.post('/products/add-new-product', authenticateToken, AddProducts);
router.put('/products/update/:productId', authenticateToken, UpdateProducts);
router.put('/products/v-delete/:productId', authenticateToken, VirtualDelProduct);

export default router;