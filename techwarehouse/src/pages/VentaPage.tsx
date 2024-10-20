import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  VStack,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import api from "../api/axios"; // Asegúrate de que este archivo esté configurado

interface Venta {
  id: number;
  product: string;
  bodega: string;
  cantidad: number;
  fecha: string;
}

const VentaPage = () => {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [productos, setProductos] = useState([]);
  const [bodegas, setBodegas] = useState([]);
  const [producto, setProducto] = useState("");
  const [bodega, setBodega] = useState("");
  const [cantidad, setCantidad] = useState<number>(1);
  const toast = useToast();

  // Obtener las ventas existentes desde el backend
  const fetchVentas = async () => {
    try {
      const response = await api.get("/ventas/");
      setVentas(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar las ventas",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Obtener los productos y bodegas disponibles
  const fetchProductosYBodegas = async () => {
    try {
      const productosResponse = await api.get("/productos/");
      const bodegasResponse = await api.get("/bodegas/");
      setProductos(productosResponse.data);
      setBodegas(bodegasResponse.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos o bodegas",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchVentas();
    fetchProductosYBodegas();
  }, []);

  // Manejar el envío del formulario para agregar una nueva venta
  const handleAddVenta = async () => {
    try {
      await api.post("/ventas/", {
        product: producto,
        bodega: bodega,
        cantidad: cantidad,
      });
      toast({
        title: "Venta agregada",
        description: "La venta fue registrada con éxito",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchVentas(); // Actualizar la lista de ventas
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo agregar la venta",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8}>
      <Heading mb={6}>Ventas</Heading>

      {/* Formulario para agregar una venta */}
      <VStack spacing={4} align="flex-start">
        <FormControl id="producto" isRequired>
          <FormLabel>Producto</FormLabel>
          <Select
            placeholder="Selecciona un producto"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
          >
            {productos.map((prod: any) => (
              <option key={prod.id} value={prod.id}>
                {prod.nombre}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl id="bodega" isRequired>
          <FormLabel>Bodega</FormLabel>
          <Select
            placeholder="Selecciona una bodega"
            value={bodega}
            onChange={(e) => setBodega(e.target.value)}
          >
            {bodegas.map((bod: any) => (
              <option key={bod.id} value={bod.id}>
                {bod.nombre}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl id="cantidad" isRequired>
          <FormLabel>Cantidad</FormLabel>
          <Input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value))}
            placeholder="Cantidad de productos"
          />
        </FormControl>

        <Button colorScheme="blue" onClick={handleAddVenta}>
          Agregar Venta
        </Button>
      </VStack>

      <Box mt={8}>
        <Heading as="h2" size="lg" mb={4}>
          Lista de Ventas
        </Heading>
        {ventas.length === 0 ? (
          <Text>No hay ventas registradas.</Text>
        ) : (
          ventas.map((venta) => (
            <Box key={venta.id} p={4} borderWidth={1} mb={4} borderRadius="md">
              <Text>Producto: {venta.product}</Text>
              <Text>Bodega: {venta.bodega}</Text>
              <Text>Cantidad: {venta.cantidad}</Text>
              <Text>Fecha: {new Date(venta.fecha).toLocaleString()}</Text>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default VentaPage;
