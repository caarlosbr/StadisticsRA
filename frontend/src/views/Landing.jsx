import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    VStack,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    useDisclosure,
  } from "@chakra-ui/react";
  import { Link as RouterLink } from "react-router-dom";
  import { useState } from "react";
  
  export default function Landing() {
    const [form, setForm] = useState({
      nombre: "",
      correo: "",
      contraseña: "",
      contraseña2: "",
    });
  
    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (form.contraseña !== form.contraseña2) {
            alert("Las contraseñas no coinciden");
            return;
          }

        try {
          const res = await fetch("http://192.168.1.37:3001/api/registrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
      
          const data = await res.json();
      
          if (res.ok) {
            alert("Usuario registrado correctamente");
            setForm({ nombre: "", correo: "", contraseña: "", contraseña2: "" });
            // Redirigir a la página de inicio de sesión o dashboard
            window.location.href = "/login"; // Cambia esto según tu ruta
          } else {
            alert("Error: " + data.error);
          }
        } catch (err) {
          console.error("Error al registrar:", err);
          alert("Error inesperado al registrar");
        }
      };
      
  
    return (
      <Box
        minH="100vh"
        /* bgGradient=" #1a1a1a" */
        bgImage="url('img/layered-waves-haikei.svg')"
        bgSize="cover"
        bgPosition="center"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={4}
      >
        <Box
          bg="rgba(255, 255, 255, 0.05)"
          backdropFilter="blur(10px)"
          borderRadius="xl"
          p={10}
          w="full"
          maxW="lg"
          boxShadow="xl"
        >
          <VStack spacing={6}>
            <Heading size="2xl" fontWeight={900}>
              Bienvenido a RAStats
            </Heading>
            <Text fontSize="lg" maxW="md" textAlign="center">
              Regístrate para comenzar a controlar tu progreso.
            </Text>
  
            <VStack as="form" spacing={8} w="100%" onSubmit={handleSubmit} > 
              <FormControl id="nombre" isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                />
              </FormControl>
  
              <FormControl id="correo" isRequired>
                <FormLabel>Correo electrónico</FormLabel>
                <Input
                  type="email"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                  placeholder="correo@ejemplo.com"
                />
              </FormControl>
  
              <FormControl id="contraseña" isRequired>
                <FormLabel>Contraseña</FormLabel>
                <InputGroup>
                  <Input
                    type="password"
                    name="contraseña"
                    value={form.contraseña}
                    onChange={handleChange}
                    placeholder="********"
                  />
                </InputGroup>
              </FormControl>

              <FormControl id="contraseña2" isRequired>
                <FormLabel>Repetir Contraseña</FormLabel>
                <InputGroup>
                  <Input
                    type="password"
                    name="contraseña2"
                    value={form.contraseña2}
                    onChange={handleChange}
                    placeholder="********"
                  />
                </InputGroup>
              </FormControl>
  
              <Button size="lg" type="submit" w="100%" id="btn-registrar"> 
                Registrarse
              </Button>
  
              <Text fontSize="sm" color="gray.300">
                ¿Ya tienes cuenta?{" "}
                <Button
                  as={RouterLink}
                  to="/"
                  variant="link"
                  color="#001220"
                  fontWeight="bold"
                  size="md"
                >
                  Inicia sesión
                </Button>
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Box>


    );
  }
