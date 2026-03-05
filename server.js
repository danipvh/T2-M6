require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors());
app.use(express.json());

// conexión a PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

// prueba de conexión
pool.connect()
  .then(() => console.log("Conectado a PostgreSQL"))
  .catch(err => console.error("Error de conexión", err));

const PORT = process.env.PORT || 3000;


//---------------------
// ENDPOINTS 
//---------------------


// GET conductores 
app.get('/conductores', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM conductores');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener conductores' });
  }
});


// GET automoviles
app.get('/automoviles', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM automoviles');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener automóviles' });
  }
});


// GET conductores menores de cierta edad sin auto
app.get('/conductoressinauto', async (req, res) => {
  console.log('Endpoint /conductoressinauto llamado con edad:', req.query.edad);
  const edad = req.query.edad;

  if (!edad || isNaN(edad)) {
    console.log('Edad inválida');
    return res.status(400).json({ error: 'Debe proporcionar una edad válida como parámetro de consulta' });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM conductores c
       WHERE c.edad < $1
       AND c.nombre NOT IN (
         SELECT nombre_conductor FROM automoviles
         WHERE nombre_conductor IS NOT NULL
       )`,
      [edad]
    );
    console.log('Resultado:', result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error('Error en consulta:', error);
    res.status(500).json({ error: 'Error en consulta' });
  }
});


// GET conductores sin auto y autos sin conductor (solitos)
app.get('/solitos', async (req, res) => {
  try {

    // Conductores sin auto
    const conductoresSinAuto = await pool.query(
      `SELECT * FROM conductores c
       WHERE c.nombre NOT IN (
         SELECT nombre_conductor FROM automoviles
         WHERE nombre_conductor IS NOT NULL
       )`
    );

    // Autos sin conductor
    const autosSinConductor = await pool.query(
      `SELECT * FROM automoviles
       WHERE nombre_conductor IS NULL`
    );

    res.json({
      conductoresSinAuto: conductoresSinAuto.rows,
      autosSinConductor: autosSinConductor.rows
    });

  } catch (error) {
    res.status(500).json({ error: 'Error en solitos' });
  }
});

// GET automovil por patente o inicio de patente
app.get('/auto', async (req, res) => {
  const { patente, iniciopatente } = req.query;

  try {

    // Buscar por patente exacta
    if (patente) {
      const result = await pool.query(
        `SELECT a.marca, a.patente, a.nombre_conductor,
                c.edad
         FROM automoviles a
         LEFT JOIN conductores c
         ON a.nombre_conductor = c.nombre
         WHERE a.patente = $1`,
        [patente]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ mensaje: 'No encontrado' });
      }

      return res.json(result.rows[0]);
    }

    // Buscar por inicio de patente
    if (iniciopatente) {
      const result = await pool.query(
        `SELECT a.marca, a.patente, a.nombre_conductor,
                c.edad
         FROM automoviles a
         LEFT JOIN conductores c
         ON a.nombre_conductor = c.nombre
         WHERE a.patente ILIKE $1`,
        [`${iniciopatente}%`]
      );

      return res.json(result.rows);
    }

    res.status(400).json({ mensaje: 'Debe enviar patente o iniciopatente' });

  } catch (error) {
    res.status(500).json({ error: 'Error en consulta auto' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});