// src/components/ProductForm.tsx
import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";

interface ProductFormProps {
  nombre: string;
  setNombre: (value: string) => void;
  precio: string;
  setPrecio: (value: string) => void;
  categoria: string;
  setCategoria: (value: string) => void;
  onSubmit: () => void;
  isEditMode: boolean;
}

const ProductForm = ({
  nombre,
  setNombre,
  precio,
  setPrecio,
  categoria,
  setCategoria,
  onSubmit,
  isEditMode,
}: ProductFormProps) => {
  return (
    <Box>
      <FormControl id="nombre" mb={4} isRequired>
        <FormLabel>Nombre</FormLabel>
        <Input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del producto"
        />
      </FormControl>

      <FormControl id="precio" mb={4} isRequired>
        <FormLabel>Precio</FormLabel>
        <Input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          placeholder="Precio del producto"
        />
      </FormControl>

      <FormControl id="categoria" mb={4} isRequired>
        <FormLabel>Categoría</FormLabel>
        <Input
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          placeholder="Categoría del producto"
        />
      </FormControl>

      <Button colorScheme="blue" onClick={onSubmit}>
        {isEditMode ? "Guardar Cambios" : "Agregar Producto"}
      </Button>
    </Box>
  );
};

export default ProductForm;
