// src/App.tsx
import React, { useState } from "react";
import AddProduct from "./Components/AddProduct";
import ProductList from "./Components/ProductList";
import UpdateProduct from "./Components/UpdateProduct";
import { Product } from "./types/Product";
import "./index.css"; 

const App: React.FC = () => {
  const [updated, setUpdated] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductAdded = () => setUpdated((prev) => !prev);
  const handleProductUpdated = () => {
    setUpdated((prev) => !prev);
    setSelectedProduct(null); // Resetea el producto seleccionado después de la actualización
  };

  return (
    <div>
      <h1>Sistema de Gestión de Inventario</h1>
      <AddProduct onProductAdded={handleProductAdded} />
      {selectedProduct ? (
        <UpdateProduct
          product={selectedProduct}
          onProductUpdated={handleProductUpdated}
        />
      ) : (
        <ProductList onProductSelect={setSelectedProduct} updated={updated} /> // Pasa `updated` aquí
      )}
    </div>
  );
};

export default App;