// src/Components/UpdateProduct.tsx
import React, { useState } from "react";
import { updateProduct } from "../Services/ProductoService";
import { Product } from "../types/Product";

interface UpdateProductProps {
  product: Product;
  onProductUpdated: () => void;
}

const UpdateProduct: React.FC<UpdateProductProps> = ({
  product,
  onProductUpdated,
}) => {
  const [name, setName] = useState(product.name);
  const [stock, setStock] = useState(product.stock);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateProduct({ ...product, name, stock });
    onProductUpdated();
  };

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
        required
      />
      <button type="submit">Actualizar Producto</button>
    </form>
  );
};

export default UpdateProduct;
