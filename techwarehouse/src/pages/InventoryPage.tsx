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
  useToast,
} from "@chakra-ui/react";
import api from "../api/axios"; 

interface Inventario {
  product_nombre: string;
  bodega_nombre: string;
  stock: number;
}

const InventoryPage = () => {
  const [inventarios, setInventarios] = useState<Inventario[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // Función para obtener inventarios desde el backend
  const fetchInventarios = async () => {
    try {
      const response = await api.get("/inventarios/");
      setInventarios(response.data);
    } catch (error) {
      toast({
        title: "Error al cargar inventarios",
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
      <Heading as="h1" size="xl" mb={6}>
        Inventario
      </Heading>

      {loading ? (
        <Box>Cargando inventario...</Box>
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
            {inventarios.map((inventario, index) => (
              <Tr key={index}>
                <Td>{inventario.product_nombre}</Td>
                <Td>{inventario.bodega_nombre}</Td>
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
