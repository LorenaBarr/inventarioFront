// src/pages/ProductPage.tsx

import { useEffect, useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import api from "../api/axios";

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/productos/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener los productos", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nombre</Th>
            <Th>Descripción</Th>
            <Th>Precio</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              <Td>{product.id}</Td>
              <Td>{product.nombre}</Td>
              <Td>{product.descripcion}</Td>
              <Td>{product.precio}</Td>
              <Td>
                <Button colorScheme="blue" mr={2}>
                  Editar
                </Button>
                <Button colorScheme="red">Eliminar</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ProductPage;
