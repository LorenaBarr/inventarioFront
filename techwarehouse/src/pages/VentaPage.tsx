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
  FormControl,
  FormLabel,
  Select,
  NumberInput,
  NumberInputField,
  useToast,
} from "@chakra-ui/react";
import api from "../api/axios"; 

interface Venta {
  id: number;
  product_nombre: string;
  bodega_nombre: string;
  cantidad: number;
  fecha: string;
}

interface Product {
  id: number;
  nombre: string;
}

interface Bodega {
  id: number;
  nombre: string;
}

const VentaPage = () => {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [bodegas, setBodegas] = useState<Bodega[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [selectedBodega, setSelectedBodega] = useState<number | null>(null);
  const [cantidad, setCantidad] = useState<number | string>("");
  const toast = useToast();

  // Función para obtener ventas desde el backend
  const fetchVentas = async () => {
    try {
      const response = await api.get("/ventas/");
      setVentas(response.data);
    } catch (error) {
      toast({
        title: "Error al cargar ventas",
        description: "No se pudo cargar la lista de ventas.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Función para obtener productos y bodegas desde el backend
  const fetchProductosYBodegas = async () => {
    try {
      const productResponse = await api.get("/productos/");
      const bodegaResponse = await api.get("/bodegas/");
      setProducts(productResponse.data);
      setBodegas(bodegaResponse.data);
    } catch (error) {
      toast({
        title: "Error al cargar datos",
        description: "No se pudo cargar los productos o bodegas.",
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

  // Función para agregar una nueva venta
  const handleAddVenta = async () => {
    if (!selectedProduct || !selectedBodega || !cantidad) {
      toast({
        title: "Faltan datos",
        description:
          "Debes seleccionar un producto, una bodega y una cantidad.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await api.post("/ventas/", {
        product: selectedProduct,
        bodega: selectedBodega,
        cantidad: cantidad,
      });
      toast({
        title: "Venta realizada",
        description: "La venta se registró correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Actualizar la lista de ventas después de agregar
      fetchVentas();
      // Reiniciar formulario
      setSelectedProduct(null);
      setSelectedBodega(null);
      setCantidad("");
    } catch (error) {
      // Si el error es por falta de stock disponible
      if (error.response && error.response.data) {
        toast({
          title: "Error al registrar venta",
          description: error.response.data[0], // Muestra el mensaje de error del backend
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error al registrar venta",
          description: "No se pudo registrar la venta.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={6}>
        Ventas
      </Heading>

      {/* Formulario para agregar una nueva venta */}
      <Box mb={8}>
        <Heading as="h2" size="lg" mb={4}>
          Agregar Venta
        </Heading>
        <FormControl mb={4}>
          <FormLabel>Producto</FormLabel>
          <Select
            placeholder="Selecciona un producto"
            value={selectedProduct ?? ""}
            onChange={(e) => setSelectedProduct(parseInt(e.target.value))}
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.nombre}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Bodega</FormLabel>
          <Select
            placeholder="Selecciona una bodega"
            value={selectedBodega ?? ""}
            onChange={(e) => setSelectedBodega(parseInt(e.target.value))}
          >
            {bodegas.map((bodega) => (
              <option key={bodega.id} value={bodega.id}>
                {bodega.nombre}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Cantidad</FormLabel>
          <NumberInput
            value={cantidad}
            onChange={(valueAsString, valueAsNumber) =>
              setCantidad(valueAsNumber)
            }
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>

        <Button colorScheme="blue" onClick={handleAddVenta}>
          Registrar Venta
        </Button>
      </Box>

      {/* Tabla de ventas realizadas */}
      <Heading as="h2" size="lg" mb={4}>
        Historial de Ventas
      </Heading>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Producto</Th>
            <Th>Bodega</Th>
            <Th>Cantidad</Th>
            <Th>Fecha</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ventas.map((venta) => (
            <Tr key={venta.id}>
              <Td>{venta.product_nombre}</Td>
              <Td>{venta.bodega_nombre}</Td>
              <Td>{venta.cantidad}</Td>
              <Td>{new Date(venta.fecha).toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default VentaPage;
