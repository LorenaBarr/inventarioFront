// src/pages/ProductDetailPage.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";
import api from "../api/axios";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/productos/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error al cargar el producto", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <Text>Cargando producto...</Text>;
  }

  return (
    <Box>
      <Heading>{product.nombre}</Heading>
      <Text>Precio: ${product.precio}</Text>
      <Text>Categoría: {product.categoria}</Text>
      <Text>Descripción: {product.descripcion}</Text>
    </Box>
  );
};

export default ProductDetailPage;
