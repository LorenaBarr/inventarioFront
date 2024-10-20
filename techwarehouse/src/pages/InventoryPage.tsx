import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons"; // Asegúrate de haber instalado @chakra-ui/icons
import api from "../api/axios"; // Instancia de axios configurada

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

const InventoryPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  // Función para obtener productos desde el backend
  const fetchProducts = async () => {
    try {
      const response = await api.get("/productos/");
      setProducts(response.data);
    } catch (error) {
        console.log(error)
      toast({
        title: "Error al cargar productos",
        description: "No se pudo cargar la lista de productos.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); // Se omite la dependencia `fetchProducts` porque la definimos dentro del `useEffect`

  // Función para eliminar un producto
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/productos/${id}/`);
      setProducts(products.filter((product) => product.id !== id));
      toast({
        title: "Producto eliminado",
        description: "El producto fue eliminado con éxito.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
        console.log(error);
      toast({
        title: "Error al eliminar",
        description: "No se pudo eliminar el producto.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Función para redirigir a la página de agregar producto
  const handleAddProduct = () => {
    navigate("/products/new");
  };

  return (
    <Box p={8}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1" size="xl">
          Inventario de Productos
        </Heading>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          onClick={handleAddProduct}
        >
          Agregar Producto
        </Button>
      </Flex>

      {loading ? (
        <Box>Cargando productos...</Box>
      ) : (
        <Table variant="striped" colorScheme="gray">
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
                <Td>${product.precio}</Td>
                <Td>
                  <Button
                    colorScheme="teal"
                    mr={2}
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    Editar
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(product.id)}
                  >
                    Eliminar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default InventoryPage;
