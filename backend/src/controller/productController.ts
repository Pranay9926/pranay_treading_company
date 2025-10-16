import { Request, Response } from "express";
import { CreateProduct } from "../service/productService";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const product = await CreateProduct(req.body);
    return res.status(201).json({ message: "Product created successfully", product });
  } catch (error: any) {
    return res.status(400).json({ message: error?.message || "Failed to create product" });
  }
};
