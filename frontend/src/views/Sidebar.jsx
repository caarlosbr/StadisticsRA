import { Box, VStack, Text, Link } from "@chakra-ui/react";
import { NavLink as RouterLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <Box
      w="250px"
      bg="gray.800"
      color="white"
      p={6}
      position="sticky"
      top={0}
      minH="100vh"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={8}>
        RAStats 🏋️
      </Text>

      <VStack align="start" spacing={4}>
        <Link as={RouterLink} to="/dashboard">
          Dashboard
        </Link>
        <Link as={RouterLink} to="/progreso">
          Progreso
        </Link>
        <Link as={RouterLink} to="/perfil">
          Perfil
        </Link>
      </VStack>
    </Box>
  );
}
