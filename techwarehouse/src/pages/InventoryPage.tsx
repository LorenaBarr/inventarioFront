import { useState, useEffect } from "react";
import {
  Box,
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
import api from "../api/axios"; // Instancia de Axios configurada

interface Inventario {
  id: number;
  product: {
    nombre: string;
  };
  bodega: {
    nombre: string;
  };
  stock: number;
}

const InventoryPage = () => {
  const [inventarios, setInventarios] = useState<Inventario[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // Función para obtener el inventario desde el backend
  const fetchInventarios = async () => {
    try {
      const response = await api.get("/inventarios/");
      setInventarios(response.data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error al cargar inventario",
        description: "No se pudo cargar la lista de inventarios.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventarios();
  }, []);

  return (
    <Box p={8}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1" size="xl">
          Inventario
        </Heading>
      </Flex>

      {loading ? (
        <Box>Cargando inventarios...</Box>
      ) : (
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Producto</Th>
              <Th>Bodega</Th>
              <Th>Stock</Th>
            </Tr>
          </Thead>
          <Tbody>
            {inventarios.map((inventario) => (
              <Tr key={inventario.id}>
                <Td>{inventario.product.nombre}</Td>
                <Td>{inventario.bodega.nombre}</Td>
                <Td>{inventario.stock}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default InventoryPage;
