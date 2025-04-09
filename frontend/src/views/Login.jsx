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
  import { useEffect } from "react";
  import { useNavigate } from "react-router-dom";

  export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
      const user = localStorage.getItem("usuario");
      if (user) navigate("/dashboard");
    }, []);

    const [form, setForm] = useState({
      correo: "",
      contraseña: "",
    });
  
    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const res = await fetch("http://192.168.1.37:3001/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
      
          const data = await res.json();
      
          if (res.ok) {
            // Quedarme con los datos del usuario
            localStorage.setItem("usuario", JSON.stringify(data.usuario)); 
            setForm({ correo: "", contraseña: "" });
            // Redirigir a la página de inicio de sesión o dashboard
            window.location.href = "/dashboard"; // Cambia esto según tu ruta
          } else {
            alert("Error: " + data.error);
          }
        } catch (err) {
          console.error("Error al iniciar sesión:", err);
          alert("Error inesperado al iniciar sesión");
        }
    }

    return (
      <Box
        minH="100vh"
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
              Inicia Sesión para seguir tu progreso.
            </Text>
  
            <VStack as="form" spacing={8} w="100%" onSubmit={handleSubmit}>
  
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
  
              <Button size="lg" type="submit" w="100%"
                  fontWeight="bold"
                >
                Iniciar Sesión
              </Button>

              <Text fontSize="sm" color="gray.300">
                ¿Aún no tienes cuenta?{" "}
                <Button
                  as={RouterLink}
                  to="/registrar"
                  variant="link"
                  color="#001220"
                  fontWeight="bold"
                  size="md"
                >
                  Regístrate
                </Button>
              </Text>
  
            </VStack>
          </VStack>
        </Box>
      </Box>
    );
  }
  