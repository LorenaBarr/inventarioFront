import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  nombre: string;
  setNombre: (value: string) => void;
  precio: string;
  setPrecio: (value: string) => void;
  categoria: string;
  setCategoria: (value: string) => void;
  isEditMode: boolean;
}

const ProductModal = ({
  isOpen,
  onClose,
  onSave,
  nombre,
  setNombre,
  precio,
  setPrecio,
  categoria,
  setCategoria,
  isEditMode,
}: ProductModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEditMode ? "Editar Producto" : "Agregar Producto"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onSave}>
            {isEditMode ? "Guardar Cambios" : "Agregar Producto"}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;
