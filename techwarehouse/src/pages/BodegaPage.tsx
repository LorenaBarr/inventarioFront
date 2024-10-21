// src/pages/BodegaPage.tsx

import { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  
  Heading,
} from "@chakra-ui/react";
import api from "../api/axios";

interface Bodega {
  id: number;
  nombre: string;
  ubicacion: string;
}

const BodegaPage = () => {
  const [bodegas, setBodegas] = useState<Bodega[]>([]);

  useEffect(() => {
    const fetchBodegas = async () => {
      try {
        const response = await api.get("/bodegas/");
        setBodegas(response.data);
      } catch (error) {
        console.error("Error al obtener las bodegas", error);
      }
    };

    fetchBodegas();
  }, []);

  return (
    <Box p={5}>
      <Heading mb={4}>Bodegas</Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nombre</Th>
            <Th>Ubicación</Th>
            
          </Tr>
        </Thead>
        <Tbody>
          {bodegas.map((bodega) => (
            <Tr key={bodega.id}>
              <Td>{bodega.id}</Td>
              <Td>{bodega.nombre}</Td>
              <Td>{bodega.ubicacion}</Td>
              
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default BodegaPage;
