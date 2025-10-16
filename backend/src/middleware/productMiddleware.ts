import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "name is required"),
  description: z.string().optional(),
  price: z.number().positive("price must be > 0"),
  stock: z.number().int().nonnegative(),
  category: z.string().optional(),
});

export const productMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Convert numeric fields from string to number if needed
    if (typeof req.body?.price === "string") req.body.price = Number(req.body.price);
    if (typeof req.body?.stock === "string") req.body.stock = Number(req.body.stock);

    productSchema.parse(req.body);
    next();
  } catch (err: any) {
    res.status(400).json({ message: err?.errors?.[0]?.message || "Invalid payload" });
  }
};
