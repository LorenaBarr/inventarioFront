import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // Instancia de Axios configurada

const AddProductPage = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/productos/", { nombre, descripcion, precio });
      toast({
        title: "Producto agregado",
        description: "El producto ha sido agregado correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/products"); // Redirige a la página de productos
    } catch (error) {
      toast({
        title: "Error al agregar producto",
        description: "Hubo un error al agregar el producto.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8}>
      <form onSubmit={handleSubmit}>
        <FormControl id="nombre" isRequired>
          <FormLabel>Nombre del Producto</FormLabel>
          <Input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del producto"
          />
        </FormControl>

        <FormControl id="descripcion" mt={4}>
          <FormLabel>Descripción</FormLabel>
          <Textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción del producto"
          />
        </FormControl>

        <FormControl id="precio" mt={4} isRequired>
          <FormLabel>Precio</FormLabel>
          <NumberInput
            value={precio}
            onChange={(valueAsString, valueAsNumber) =>
              setPrecio(valueAsNumber)
            }
          >
            <NumberInputField placeholder="Precio del producto" />
          </NumberInput>
        </FormControl>

        <Button colorScheme="blue" type="submit" mt={4}>
          Agregar Producto
        </Button>
      </form>
    </Box>
  );
};

export default AddProductPage;
