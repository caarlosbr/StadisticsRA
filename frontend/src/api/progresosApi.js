import axios from "axios";

const API_URL = "http://localhost:3001/api/progresos";

export const getProgresos = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    console.error("Error obteniendo los progresos:", err);
    return [];
  }
};
