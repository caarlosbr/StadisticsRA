const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Ruta a tu base de datos local
const dbPath = path.join(__dirname, "gym.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err.message);
  } else {
    console.log("Conectado a SQLite ✔️");
  }
});

// Ruta de ejemplo: obtener progresión de peso
app.get("/api/progresos", (req, res) => {
  const query = "SELECT fecha, peso FROM progresos ORDER BY fecha";
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Ruta de ejemplo: obtener tipos de movimientos
app.get("/api/tiposmovimientos", (req, res) => {
  const query = "SELECT * FROM tiposmovimientos";
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Ruta para registrar usuarios
app.post("/api/registrar", (req, res) => {
  const { nombre, correo, contraseña } = req.body;

  if (!nombre || !correo || !contraseña) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const query = `INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)`;

  db.run(query, [nombre, correo, contraseña], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({ id: this.lastID, message: "Usuario registrado correctamente ✅" });
  });
});


// Ruta para iniciar sesión
app.post("/api/login", (req, res) => {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const query = `SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?`;

  db.get(query, [correo, contraseña], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!row) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    res.json({ message: "Inicio de sesión exitoso", usuario: row });
  });
});



const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
