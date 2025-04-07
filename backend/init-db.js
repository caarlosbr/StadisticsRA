const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "gym.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error("Error al crear DB:", err.message);
  console.log("Base de datos creada correctamente 🧱");
});

db.serialize(() => {
  // Tabla progresos
  db.run(`CREATE TABLE IF NOT EXISTS progresos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha TEXT NOT NULL,
    peso REAL NOT NULL
  );`);

  const stmt = db.prepare("INSERT INTO progresos (fecha, peso) VALUES (?, ?)");
  stmt.run("2025-03-01", 60);
  stmt.run("2025-03-08", 62);
  stmt.run("2025-03-15", 65);
  stmt.run("2025-03-22", 66);
  stmt.finalize();

  // NUEVA tabla tiposmovimientos
  db.run(`CREATE TABLE IF NOT EXISTS tiposmovimientos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_corto TEXT NOT NULL,
    descripcion TEXT
  );`);

  const insertTipos = db.prepare("INSERT INTO tiposmovimientos (nombre_corto, descripcion) VALUES (?, ?)");

  insertTipos.run("Máquina superior", "Ejercicio en máquina para el tren superior");
  insertTipos.run("Press banca barra", "Press de banca plano con barra");
  insertTipos.run("Sentadilla libre", "Sentadilla con barra sin soporte");
  insertTipos.run("Dominadas", "Dominadas con agarre neutro o supino");

  insertTipos.finalize();

  console.log("Tablas y datos de ejemplo creados correctamente ✅");

  db.close();
});
