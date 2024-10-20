// src/pages/AddProductPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import api from "../api/axios";

const AddProductPage = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    try {
      await api.post("/productos/", {
        nombre,
        precio: parseFloat(precio),
        categoria,
      });
      navigate("/inventory");
    } catch (error) {
      console.error("Error al agregar el producto", error);
    }
  };

  return (
    <ProductForm
      nombre={nombre}
      setNombre={setNombre}
      precio={precio}
      setPrecio={setPrecio}
      categoria={categoria}
      setCategoria={setCategoria}
      onSubmit={handleAddProduct}
      isEditMode={false}
    />
  );
};

export default AddProductPage;
