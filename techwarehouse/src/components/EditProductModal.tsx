import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import api from "../api/axios";

interface EditProductModalProps {
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  onProductUpdated: () => void; // Para recargar la lista de productos después de la edición
}

const EditProductModal = ({
  productId,
  productName,
  productDescription,
  productPrice,
  onProductUpdated,
}: EditProductModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nombre, setNombre] = useState(productName);
  const [descripcion, setDescripcion] = useState(productDescription);
  const [precio, setPrecio] = useState(productPrice);
  const toast = useToast();

  const handleEditProduct = async () => {
    try {
      await api.put(`/productos/${productId}/`, {
        nombre,
        descripcion,
        precio,
      });
      toast({
        title: "Producto actualizado",
        description: "El producto fue actualizado con éxito.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      onProductUpdated(); // Recargar la lista de productos
    } catch (error) {
      console.log(error);
      toast({
        title: "Error al actualizar",
        description: "No se pudo actualizar el producto.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen} mr={2}>
        Editar
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Producto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Descripción</FormLabel>
              <Input
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Precio</FormLabel>
              <Input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(parseFloat(e.target.value))}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEditProduct}>
              Guardar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProductModal;
