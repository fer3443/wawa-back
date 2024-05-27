import express from 'express';
import { AddProducts, GetAllProducts, UpdateProducts, VirtualDelProduct } from '../controllers/products.controller';
import { authenticateToken } from '../helpers/token.helper';

const router = express.Router();
router.use(express.json());

router.post('/products/add-new-product', authenticateToken, AddProducts);
router.get('/products/all-products', authenticateToken, GetAllProducts);
router.put('/products/update/:productId', authenticateToken, UpdateProducts);
router.put('/products/v-delete/:productId', authenticateToken, VirtualDelProduct);

export default router;