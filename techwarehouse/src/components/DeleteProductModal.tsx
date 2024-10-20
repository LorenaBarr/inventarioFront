import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import api from "../api/axios";

interface DeleteProductModalProps {
  productId: number;
  productName: string;
  onProductDeleted: () => void; // Para recargar la lista de productos después de eliminar
}

const DeleteProductModal = ({
  productId,
  productName,
  onProductDeleted,
}: DeleteProductModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleDeleteProduct = async () => {
    try {
      await api.delete(`/productos/${productId}/`);
      toast({
        title: "Producto eliminado",
        description: `El producto ${productName} ha sido eliminado.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      onProductDeleted(); // Recargar la lista de productos
    } catch (error) {
      console.log(error);
      toast({
        title: "Error al eliminar",
        description: "No se pudo eliminar el producto.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Eliminar
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Eliminar Producto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              ¿Estás seguro de que deseas eliminar el producto {productName}?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDeleteProduct}>
              Eliminar
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

export default DeleteProductModal;
