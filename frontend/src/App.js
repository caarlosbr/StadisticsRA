import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./views/Landing";
import Dashboard from "./views/Dashboard"; // Este mostrará la gráfica
import Login from "./views/Login"; // Este mostrará el formulario de login

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registrar" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
