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
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // Instancia de Axios configurada
import EditProductModal from "../components/EditProductModal";
import DeleteProductModal from "../components/DeleteProductModal"; // Importamos los modales para editar y eliminar productos

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

interface Bodega {
  id: number;
  nombre: string;
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [bodegas, setBodegas] = useState<Bodega[]>([]); // Listado de bodegas
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState<number | string>("");
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [selectedBodega, setSelectedBodega] = useState<number | null>(null);
  const [stock, setStock] = useState<number | string>("");
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  // Función para obtener los productos y bodegas desde el backend
  const fetchData = async () => {
    try {
      const productResponse = await api.get("/productos/");
      const bodegaResponse = await api.get("/bodegas/");
      setProducts(productResponse.data);
      setBodegas(bodegaResponse.data);
    } catch (error) {
      toast({
        title: "Error al cargar datos",
        description: "No se pudo cargar la lista de productos o bodegas.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Función para agregar un nuevo producto
  const handleAddProduct = async () => {
    if (!nombre || !precio) {
      toast({
        title: "Faltan datos",
        description: "Debes ingresar el nombre y el precio del producto.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await api.post("/productos/", {
        nombre,
        descripcion,
        precio,
      });
      setProducts([...products, response.data]); // Agregar el nuevo producto a la lista
      toast({
        title: "Producto agregado",
        description: "El producto se agregó correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setNombre("");
      setDescripcion("");
      setPrecio("");
    } catch (error) {
      toast({
        title: "Error al agregar producto",
        description: "No se pudo agregar el producto.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Función para agregar un nuevo inventario (producto, bodega y stock)
  const handleAddInventario = async () => {
    if (!selectedProduct || !selectedBodega || !stock) {
      toast({
        title: "Faltan datos",
        description: "Debes seleccionar un producto, una bodega y el stock.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await api.post("/inventarios/", {
        product: selectedProduct,
        bodega: selectedBodega,
        stock: stock,
      });
      toast({
        title: "Inventario actualizado",
        description:
          "El producto fue asignado a la bodega con el stock adecuado.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Reiniciar el formulario de inventario
      setSelectedProduct(null);
      setSelectedBodega(null);
      setStock("");
    } catch (error) {
      toast({
        title: "Error al actualizar inventario",
        description: "No se pudo agregar el inventario.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1" size="xl">
          Productos
        </Heading>
      </Flex>

      {/* Formulario para agregar un nuevo producto */}
      <Box mb={8}>
        <Heading as="h2" size="lg" mb={4}>
          Agregar Producto
        </Heading>
        <FormControl mb={4}>
          <FormLabel>Nombre</FormLabel>
          <Input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del producto"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Descripción</FormLabel>
          <Input
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción del producto"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Precio</FormLabel>
          <NumberInput
            value={precio}
            onChange={(valueAsString, valueAsNumber) =>
              setPrecio(valueAsNumber)
            }
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>
        <Button colorScheme="green" onClick={handleAddProduct}>
          Agregar Producto
        </Button>
      </Box>

      {/* Formulario para asignar inventario */}
      <Box mb={8}>
        <Heading as="h2" size="lg" mb={4}>
          Asignar Stock a Producto
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
          <FormLabel>Stock</FormLabel>
          <NumberInput
            value={stock}
            onChange={(valueAsString, valueAsNumber) => setStock(valueAsNumber)}
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>
        <Button colorScheme="blue" onClick={handleAddInventario}>
          Asignar Inventario
        </Button>
      </Box>

      {/* Tabla de productos */}
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
                <EditProductModal
                  productId={product.id}
                  productName={product.nombre}
                  productDescription={product.descripcion}
                  productPrice={product.precio}
                  onProductUpdated={fetchData} // Para recargar la lista de productos
                />
                <DeleteProductModal
                  productId={product.id}
                  productName={product.nombre}
                  onProductDeleted={fetchData} // Para recargar la lista de productos
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ProductPage;
