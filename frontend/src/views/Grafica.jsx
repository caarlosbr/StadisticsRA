import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const Grafica = ({ fechas, pesos }) => {
  const data = {
    labels: fechas,
    datasets: [
      {
        label: "Progresión de peso (kg)",
        data: pesos,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={{ width: "100%", maxWidth: 600, margin: "2rem auto" }}>
      <h3>Progresión</h3>
      <Line data={data} />
    </div>
  );
};

export default Grafica;
