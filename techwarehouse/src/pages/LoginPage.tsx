import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // Instancia de Axios

const LoginPage = () => {
  const [username, setUsername] = useState(""); // Estado para almacenar el nombre de usuario
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña
  const toast = useToast();
  const navigate = useNavigate();

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    try {
      const response = await api.post("/token/", {
        username,
        password,
      });

      const { access } = response.data;

      // Almacena el token en el localStorage
      localStorage.setItem("token", access);

      toast({
        title: "Inicio de sesión exitoso",
        description: "Has iniciado sesión correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/inventory"); // Redirige al inventario después de iniciar sesión
    } catch (error) {
      toast({
        title: "Error de autenticación",
        description: "Usuario o contraseña incorrectos.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex justify="center" align="center" height="100vh">
      <Box maxWidth="400px" p={8} bg="white" borderRadius="md" shadow="md">
        <Heading as="h2" mb={6} textAlign="center">
          Iniciar Sesión
        </Heading>
        <FormControl mb={4}>
          <FormLabel>Usuario</FormLabel>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Actualiza el estado del nombre de usuario
            placeholder="Ingresa tu nombre de usuario"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Contraseña</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña
            placeholder="Ingresa tu contraseña"
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleLogin} width="full">
          Iniciar Sesión
        </Button>
      </Box>
    </Flex>
  );
};

export default LoginPage;
