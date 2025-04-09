// src/views/Dashboard.jsx
import { useEffect, useState } from "react";
import { Box, Heading, Container, Spinner, Text } from "@chakra-ui/react";
import Grafica from "./Grafica"; // o "../views/Grafica"
import { getProgresos } from "../api/progresosApi";
import Layout from "../views/Layout";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function Dashboard() {
  const [fechas, setFechas] = useState([]);
  const [pesos, setPesos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datos = await getProgresos();
        const f = datos.map((item) => item.fecha);
        const p = datos.map((item) => item.peso);
        setFechas(f);
        setPesos(p);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
{/*     <Box minH="100vh" bg="gray.900" color="white" py={12}>
      <Container maxW="container.md">
        <Heading
          as="h1"
          size="xl"
          mb={8}
          textAlign="center"
          color="brand.500"
        >
          Mi progreso 🏋️
        </Heading>

        {loading ? (
          <Spinner size="xl" thickness="4px" color="brand.500" mx="auto" display="block" />
        ) : fechas.length > 0 ? (
          <Grafica fechas={fechas} pesos={pesos} />
        ) : (
          <Text textAlign="center">No hay datos aún. 🕳️</Text>
        )}
      </Container>
    </Box> */}
    <Box minH="100vh" bg="gray.900" color="white" p={6}>
      <Heading size="lg" mb={4}>
        Calendario de entrenamientos
      </Heading>

      <Box
        maxW="fit-content"
        bg="white"
        color="black"
        borderRadius="lg"
        overflow="hidden"
        p={4}
      >
        <Calendar
          onChange={setFechaSeleccionada}
          value={fechaSeleccionada}
        />
      </Box>
    </Box>
    </Layout>
  );
}

export default Dashboard;
