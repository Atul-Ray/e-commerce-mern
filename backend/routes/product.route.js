import express from 'express';
import {getAllProduct , getFeaturedProducts ,createProduct , deleteProduct ,getProductByCategory ,toggleFeaturedProduct} from '../controllers/product.controller.js';
import {protectRoute ,adminRoute } from '../middleware/auth.middleware.js'

 const router = express.Router();


router.get("/" ,protectRoute , adminRoute ,  getAllProduct);
router.get('/featured' , getFeaturedProducts);
router.get('/category/:category' , getProductByCategory)
router.post('/' , protectRoute , adminRoute , createProduct);
router.patch('/:id' , protectRoute , adminRoute , toggleFeaturedProduct);
router.delete('/:id' , protectRoute , adminRoute , deleteProduct)
export default router;