import React from "react";
import { deleteProduct } from "../Services/ProductoService";

interface DeleteProductProps {
  productId: number;
  onProductDeleted: () => void;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({
  productId,
  onProductDeleted,
}) => {
  const handleDelete = async () => {
    try {
      await deleteProduct(productId);
      onProductDeleted(); // Llama al callback para actualizar la lista
    } catch (error) {
      alert("Error al eliminar el producto");
    }
  };

  return (
    <button onClick={handleDelete} className="delete-button">
      Eliminar
    </button>
  );
};

export default DeleteProduct;
