import axios from "../axiosConfig";
import { Product } from "../types/Product";

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get("/products/");
  return response.data;
};

export const addProduct = async (
  product: Omit<Product, "id">
): Promise<Product> => {
  const response = await axios.post("/products/", product);
  return response.data;
};

export const updateProduct = async (product: Product): Promise<Product> => {
  const response = await axios.put(`/products/${product.id}/`, product);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`/products/${id}/`);
};
