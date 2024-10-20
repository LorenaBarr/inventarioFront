import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Flex minHeight="100vh" align="center" justify="center" bg="gray.100">
      <Box textAlign="center" p={8}>
        <Heading as="h1" size="2xl" mb={4}>
          404
        </Heading>
        <Text fontSize="lg" mb={6}>
          Oops! La página que estás buscando no existe.
        </Text>
        <Button colorScheme="blue" onClick={handleGoHome}>
          Volver al Inicio
        </Button>
      </Box>
    </Flex>
  );
};

export default NotFoundPage;
