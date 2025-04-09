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


// Ruta para guardar un entrenamiento
app.post("/api/entrenamientos", (req, res) => {
  console.log("📥 Recibido en backend:", req.body);
  const { usuario_id, fecha } = req.body;

  if (!usuario_id || !fecha) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const query = `INSERT INTO entrenamientos (usuario_id, fecha) VALUES (?, ?)`;

  db.run(query, [usuario_id, fecha], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({
      message: "Entrenamiento guardado",
      entrenamiento_id: this.lastID,
    });
  });
});


// Ruta para guardar una serie
app.post("/api/series", (req, res) => {
  const { entrenamiento_id, ejercicio_id, peso, repeticiones } = req.body;

  if (!entrenamiento_id || !ejercicio_id || !peso || !repeticiones) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const query = `INSERT INTO series (entrenamiento_id, ejercicio_id, peso, repeticiones) VALUES (?, ?, ?, ?)`;

  db.run(query, [entrenamiento_id, ejercicio_id, peso, repeticiones], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({
      message: "Serie añadida correctamente",
      serie_id: this.lastID,
    });
  });
});


// Ruta para obtener los ejercicios un dia en concreto de un usuario en concreto
app.get("/api/entrenamientos/:usuario_id/:fecha", (req, res) => {
  const { usuario_id, fecha } = req.params;

  const query = `
    SELECT s.ejercicio_id, s.peso, s.repeticiones, tm.nombre_corto
    FROM series s
    JOIN entrenamientos e ON s.entrenamiento_id = e.id
    JOIN tiposmovimientos tm ON s.ejercicio_id = tm.id
    WHERE e.usuario_id = ? AND e.fecha = ?
  `;

  db.all(query, [usuario_id, fecha], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    // Agrupar por ejercicio_id
    const agrupado = {};

    rows.forEach(({ ejercicio_id, nombre_corto, peso, repeticiones }) => {
      if (!agrupado[ejercicio_id]) {
        agrupado[ejercicio_id] = {
          nombre: nombre_corto,
          series: [],
        };
      }
      agrupado[ejercicio_id].series.push({ peso, repeticiones });
    });

    res.json(agrupado);
  });
});



const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
