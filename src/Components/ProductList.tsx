// src/Components/ProductList.tsx
import React, { useEffect, useState } from "react";
import { getProducts } from "../Services/ProductoService";
import { Product } from "../types/Product";
import DeleteProduct from "./DeleteProduct";

const ProductList: React.FC<{
  onProductSelect: (product: Product) => void;
  updated: boolean;
}> = ({ onProductSelect, updated }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      setError("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [updated]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {products.map((product) => (
        <div className="card" key={product.id}>
          <span>
            {product.name} - Stock: {product.stock}
          </span>
          <button onClick={() => onProductSelect(product)}>Actualizar</button>
          <DeleteProduct
            productId={product.id}
            onProductDeleted={fetchProducts}
          />{" "}
          {/* Usa el componente de eliminación */}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
