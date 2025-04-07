const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Ruta donde se guardará la base de datos
const dbPath = path.join(__dirname, "gym.db");

// Crear base de datos (si no existe) y abrir conexión
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error("Error al crear DB:", err.message);
  console.log("Base de datos creada correctamente 🧱");
});

// Crear tabla y datos de ejemplo
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS progresos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha TEXT NOT NULL,
    peso REAL NOT NULL
  );`);

  // Insertar datos de prueba
  const stmt = db.prepare("INSERT INTO progresos (fecha, peso) VALUES (?, ?)");
  stmt.run("2025-03-01", 60);
  stmt.run("2025-03-08", 62);
  stmt.run("2025-03-15", 65);
  stmt.run("2025-03-22", 66);
  stmt.finalize();

  console.log("Tabla y datos insertados correctamente ✅");
  db.close();
});
