import { Box, Flex, Heading, Button, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const HomePage = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="gray.100"
    >
      <Box
        textAlign="center"
        maxWidth="600px"
        p={8}
        bg="white"
        borderRadius="lg"
        shadow="lg"
      >
        <Heading as="h1" size="xl" mb={4}>
          TechWarehouse
        </Heading>
        <Text fontSize="lg" mb={4}>
          Bienvenido al Gestor de Inventario
        </Text>
        <RouterLink to="/login">
          <Button colorScheme="blue" mr={4}>
            Iniciar Sesión
          </Button>
        </RouterLink>
        <RouterLink to="/register">
          <Button colorScheme="teal">Registrarse</Button>
        </RouterLink>
      </Box>
    </Flex>
  );
};

export default HomePage;
