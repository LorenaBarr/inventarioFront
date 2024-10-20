import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { register } from "../api/authApi"; //  función de registro

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register({ username, email, password }); // Llamada a la función de registro
      toast({
        title: "Cuenta creada",
        description: "Tu cuenta ha sido creada con éxito.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
    } catch (err) {
      setError("Error durante el registro");
      toast({
        title: "Error en el registro",
        description: "Hubo un error creando tu cuenta.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minHeight="100vh" align="center" justify="center" bg="gray.100">
      <Box bg="white" p={8} rounded="lg" shadow="lg" width="400px">
        <VStack spacing={4} as="form" onSubmit={handleRegister}>
          <Heading as="h2" size="lg" textAlign="center">
            Registrarse
          </Heading>

          <FormControl id="username" isRequired>
            <FormLabel>Nombre de usuario</FormLabel>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nombre de usuario"
            />
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
          </FormControl>

          {error && <Text color="red.500">{error}</Text>}

          <Button type="submit" colorScheme="blue" width="full">
            Registrarse
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default RegisterPage;
