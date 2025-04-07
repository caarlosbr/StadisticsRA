import { useEffect, useState } from "react";
import Grafica from "./views/Grafica.jsx";
import { getProgresos } from "./api/progresosApi.js";

function App() {
  const [fechas, setFechas] = useState([]);
  const [pesos, setPesos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const datos = await getProgresos();
      const f = datos.map((item) => item.fecha);
      const p = datos.map((item) => item.peso);
      setFechas(f);
      setPesos(p);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Mi progreso en el gym 🏋️</h1>
      <Grafica fechas={fechas} pesos={pesos} />
    </div>
  );
}

export default App;
