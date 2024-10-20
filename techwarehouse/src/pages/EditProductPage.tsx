// src/pages/EditProductPage.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import api from "../api/axios";

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/productos/${id}/`);
        setNombre(response.data.nombre);
        setPrecio(response.data.precio);
        setCategoria(response.data.categoria);
      } catch (error) {
        console.error("Error al cargar el producto", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleEditProduct = async () => {
    try {
      await api.put(`/productos/${id}/`, {
        nombre,
        precio: parseFloat(precio),
        categoria,
      });
      navigate("/inventory");
    } catch (error) {
      console.error("Error al editar el producto", error);
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
      onSubmit={handleEditProduct}
      isEditMode={true}
    />
  );
};

export default EditProductPage;
