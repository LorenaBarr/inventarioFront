// src/pages/VentaPage.tsx

import { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Heading,
} from "@chakra-ui/react";
import api from "../api/axios";

interface Venta {
  id: number;
  product: { nombre: string };
  bodega: { nombre: string };
  cantidad: number;
  fecha: string;
}

const VentaPage = () => {
  const [ventas, setVentas] = useState<Venta[]>([]);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await api.get("/ventas/");
        setVentas(response.data);
      } catch (error) {
        console.error("Error al obtener las ventas", error);
      }
    };

    fetchVentas();
  }, []);

  return (
    <Box p={5}>
      <Heading mb={4}>Ventas</Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Producto</Th>
            <Th>Bodega</Th>
            <Th>Cantidad</Th>
            <Th>Fecha</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ventas.map((venta) => (
            <Tr key={venta.id}>
              <Td>{venta.id}</Td>
              <Td>{venta.product.nombre}</Td>
              <Td>{venta.bodega.nombre}</Td>
              <Td>{venta.cantidad}</Td>
              <Td>{new Date(venta.fecha).toLocaleDateString()}</Td>
              <Td>
                <Button colorScheme="red">Eliminar</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default VentaPage;
