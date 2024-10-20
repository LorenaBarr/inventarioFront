import { Box, Flex, HStack, Text } from "@chakra-ui/react";

const NavInicio = () => {
  return (
    <Box bg="blue.500" px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={8} alignItems={"center"}>
          <Text fontSize="xl" fontWeight="bold" color="white">
            TechWarehouse
          </Text>
        </HStack>
      </Flex>
    </Box>
  );
};

export default NavInicio;
