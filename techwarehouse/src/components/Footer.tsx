import { Box, Text, Stack, Link, Flex } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="blue.500" color="white" py={4}>
      <Flex
        align="center"
        justify="space-between"
        maxW="1200px"
        mx="auto"
        px={4}
      >
        <Text>
          © {new Date().getFullYear()} TechWarehouse. Todos los derechos
          reservados.
        </Text>

        <Stack direction="row" spacing={4}>
          <Link href="/" color="white" _hover={{ textDecoration: "underline" }}>
            Inicio
          </Link>
          <Link
            href="/about"
            color="white"
            _hover={{ textDecoration: "underline" }}
          >
            Sobre Nosotros
          </Link>
          <Link
            href="/contact"
            color="white"
            _hover={{ textDecoration: "underline" }}
          >
            Contacto
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Footer;
