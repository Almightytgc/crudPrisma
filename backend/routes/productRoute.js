import express from 'express';
import {
    getProducts,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js"

const productRouter = express.Router();

productRouter.get('/products', getProducts);
productRouter.get('/products/:id', getProductsById);
productRouter.post('/products', createProduct);
productRouter.patch('/products/:id', updateProduct);
productRouter.delete('/products/:id', deleteProduct);

export default productRouter;
