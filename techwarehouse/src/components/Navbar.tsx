import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="blue.500" px={4} py={2}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={8} alignItems={"center"}>
          <Text fontSize="xl" fontWeight="bold" color="white">
            TechWarehouse
          </Text>
          {/* Agregar los enlaces si el usuario está autenticado */}
          <RouterLink to="/inventory">
            <ChakraLink color="white">Inventario</ChakraLink>
          </RouterLink>
          <RouterLink to="/products">
            <ChakraLink color="white">Productos</ChakraLink>
          </RouterLink>
          <RouterLink to="/bodegas">
            <ChakraLink color="white">Bodegas</ChakraLink>
          </RouterLink>
          <RouterLink to="/ventas">
            <ChakraLink color="white">Ventas</ChakraLink>
          </RouterLink>
        </HStack>
        <Flex alignItems={"center"}>
          <RouterLink to="/login">
            <Button colorScheme="green" size="sm" mr={4}>
              Iniciar Sesión
            </Button>
          </RouterLink>
          <RouterLink to="/register">
            <Button colorScheme="teal" size="sm">
              Registrarse
            </Button>
          </RouterLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
