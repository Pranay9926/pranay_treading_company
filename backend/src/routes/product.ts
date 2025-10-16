import express from "express";
import { addProduct } from "../controller/productController";
import { productMiddleware } from "../middleware/productMiddleware";

const router = express.Router();

// POST /api/products - create a product
router.post("/products", productMiddleware, addProduct);

export default router;
