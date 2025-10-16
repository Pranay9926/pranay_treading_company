import { ProductModel } from "../model/productModel";

export interface CreateProductInput {
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  category?: string | null;
}

export async function CreateProduct(input: CreateProductInput) {
  const product = await ProductModel.create({
    name: input.name,
    description: input.description ?? null,
    price: input.price,
    stock: input.stock,
    category: input.category ?? null,
  });
  return product;
}
