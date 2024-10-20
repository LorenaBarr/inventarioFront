import {
  Box,
  Flex,
  HStack,
  Text,
  Button,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NavbarDentro = () => {
  return (
    <Box bg="blue.500" px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={8} alignItems={"center"}>
          <Text fontSize="xl" fontWeight="bold" color="white">
            TechWarehouse
          </Text>
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
      </Flex>
    </Box>
  );
};

export default NavbarDentro;
