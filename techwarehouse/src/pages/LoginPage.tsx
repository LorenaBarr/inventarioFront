import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Heading,
  VStack,
  useToast,
  Flex,
} from "@chakra-ui/react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ username, password });
      toast({
        title: "Login Successful",
        description: "You've successfully logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/inventory"); // Redirigir al inventario tras iniciar sesión
    } catch (error) {
        console.log(error);
      setError("Invalid username or password");
      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minHeight="100vh" align="center" justify="center" bg="gray.100">
      <Box bg="white" p={8} rounded="lg" shadow="lg" width="400px">
        <VStack spacing={4} as="form" onSubmit={handleLogin}>
          <Heading as="h2" size="lg" textAlign="center">
            Login
          </Heading>

          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </FormControl>

          {error && <Text color="red.500">{error}</Text>}

          <Button type="submit" colorScheme="blue" width="full">
            Login
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default LoginPage;
