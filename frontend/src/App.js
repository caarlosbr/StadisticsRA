import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./views/Landing";
import Dashboard from "./views/Dashboard"; // Este mostrará la gráfica
import Login from "./views/Login"; // Este mostrará el formulario de login
import Entrenamientos from "./views/Entrenamientos";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registrar" element={<Landing />} />
        <Route path="/entrenamientos" element={<Entrenamientos />} />
      </Routes>
    </Router>
  );
}

export default App;
