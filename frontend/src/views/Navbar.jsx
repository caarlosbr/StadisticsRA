import { Flex, Text, Spacer, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const handleLogout = () => {
  // Limpiar el almacenamiento local y redirigir a la página de inicio de sesión
  localStorage.removeItem("usuario");
  window.location.href = "/"; // Cambia esto según tu ruta
}

const usuario = JSON.parse(localStorage.getItem("usuario"));


export default function Navbar() {
  return (
    <Flex bg="gray.900" px={6} py={4} align="center" borderBottom="1px solid #333">
      <Text fontWeight="bold">Bienvenido {usuario.nombre}</Text>
      <Spacer />
      <Button size="sm" colorScheme="red"  onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </Flex>
  );
}
