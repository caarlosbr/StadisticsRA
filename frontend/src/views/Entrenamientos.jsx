import {
    Box,
    Heading,
    VStack,
    Select,
    Input,
    Button,
    HStack,
    Text,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import Layout from "../views/Layout";
  
  export default function Entrenamientos() {
    const [ejerciciosDisponibles, setEjerciciosDisponibles] = useState([]);
    const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
    const [series, setSeries] = useState([
      { ejercicio_id: "", peso: "", repeticiones: "" },
    ]);
  
    const [fechaBuscar, setFechaBuscar] = useState("");
    const [seriesPrevias, setSeriesPrevias] = useState({});
  
    useEffect(() => {
      fetch("http://localhost:3001/api/tiposmovimientos")
        .then((res) => res.json())
        .then((data) => setEjerciciosDisponibles(data));
    }, []);
  
    const handleChangeSerie = (index, field, value) => {
      const updated = [...series];
      updated[index][field] = value;
      setSeries(updated);
    };
  
    const añadirSerie = () => {
      setSeries([...series, { ejercicio_id: "", peso: "", repeticiones: "" }]);
    };
  
    const eliminarSerie = (index) => {
      const actualizadas = [...series];
      actualizadas.splice(index, 1);
      setSeries(actualizadas);
    };
  
    const buscarPorFecha = async () => {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      if (!usuario) return;
  
      const res = await fetch(
        `http://localhost:3001/api/entrenamientos/${usuario.id}/${fechaBuscar}`
      );
      const data = await res.json();
      setSeriesPrevias(data);
    };
  
    const guardarEntrenamiento = async () => {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      if (!usuario) {
        alert("Usuario no autenticado");
        return;
      }
  
      try {
        const res = await fetch("http://localhost:3001/api/entrenamientos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usuario_id: usuario.id, fecha }),
        });
  
        const data = await res.json();
        const entrenamiento_id = data.entrenamiento_id;
  
        if (!entrenamiento_id) {
          throw new Error("No se pudo crear el entrenamiento");
        }
  
        for (const serie of series) {
          await fetch("http://localhost:3001/api/series", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              entrenamiento_id,
              ejercicio_id: serie.ejercicio_id,
              peso: serie.peso,
              repeticiones: serie.repeticiones,
            }),
          });
        }
  
        alert("✅ Entrenamiento guardado correctamente");
        setSeries([{ ejercicio_id: "", peso: "", repeticiones: "" }]);
      } catch (err) {
        console.error("Error al guardar entrenamiento:", err);
        alert("Error al guardar entrenamiento");
      }
    };
  
    return (
      <Layout>
        <Box p={6} bg="gray.900" color="white" minH="100vh">
          <Heading mb={6}>Crear entrenamiento 🏋️</Heading>
  
          <VStack align="start" mb={6}>
            <Text fontWeight="bold">Fecha del entrenamiento:</Text>
            <Input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              maxW="200px"
              bg="gray.800"
              color="white"
            />
          </VStack>
  
          <VStack spacing={6} align="stretch">
            {series.map((serie, index) => (
              <HStack key={index} spacing={4} align="center">
                <Select
                  placeholder="Selecciona ejercicio"
                  value={serie.ejercicio_id}
                  onChange={(e) => handleChangeSerie(index, "ejercicio_id", e.target.value)}
                >
                  {ejerciciosDisponibles.map((ej) => (
                    <option key={ej.id} value={ej.id}>
                      {ej.nombre_corto}
                    </option>
                  ))}
                </Select>
  
                <Input
                  type="number"
                  placeholder="Peso (kg)"
                  value={serie.peso}
                  onChange={(e) => handleChangeSerie(index, "peso", e.target.value)}
                />
  
                <Input
                  type="number"
                  placeholder="Reps"
                  value={serie.repeticiones}
                  onChange={(e) => handleChangeSerie(index, "repeticiones", e.target.value)}
                />
  
                {series.length > 1 && (
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => eliminarSerie(index)}
                  >
                    ❌
                  </Button>
                )}
              </HStack>
            ))}
  
            <Button onClick={añadirSerie} colorScheme="orange">
              Añadir ejercicio
            </Button>
  
            <Button onClick={guardarEntrenamiento} colorScheme="green">
              Guardar entrenamiento
            </Button>
          </VStack>
  
          <Box mt={12}>
            <Heading size="md">🔎 Buscar entrenamiento por fecha</Heading>
            <HStack mt={4}>
              <Input
                type="date"
                value={fechaBuscar}
                onChange={(e) => setFechaBuscar(e.target.value)}
                maxW="200px"
                bg="gray.800"
                color="white"
              />
              <Button onClick={buscarPorFecha} colorScheme="blue">
                Buscar
              </Button>
            </HStack>
  
            {fechaBuscar && (
              <Box mt={6}>
                {Object.keys(seriesPrevias).length === 0 ? (
                  <Text color="gray.400">
                    No se encontraron entrenamientos para el <strong>{fechaBuscar}</strong>.
                  </Text>
                ) : (
                  <VStack spacing={5} align="start" w="100%">
                    <Text fontWeight="bold">Series del {fechaBuscar}:</Text>
  
                    {Object.entries(seriesPrevias).map(([ejercicioId, { nombre, series }]) => (
                      <Box key={ejercicioId} p={4} bg="gray.800" borderRadius="md" w="100%">
                        <Text fontSize="lg" fontWeight="bold" mb={2}>
                          🏋️ {nombre}
                        </Text>
                        <VStack align="start" spacing={1}>
                          {series.map((serie, i) => (
                            <Text key={i}>• {serie.peso} kg × {serie.repeticiones} reps</Text>
                          ))}
                        </VStack>
                      </Box>
                    ))}
                  </VStack>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Layout>
    );
  }
  