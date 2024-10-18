import React, { useState } from "react";

import { addProduct } from "../Services/ProductoService";



interface AddProductProps {
  onProductAdded: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ onProductAdded }) => {
  const [name, setName] = useState("");
  const [stock, setStock] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addProduct({ name, stock });
    setName("");
    setStock(0);
    onProductAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del Producto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Cantidad en Stock"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
        required
      />
      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default AddProduct;