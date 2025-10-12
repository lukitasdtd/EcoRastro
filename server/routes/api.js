
const express = require('express');
const router = express.Router();
const pool = require('../utils/db');

// Obtener todos los puntos del mapa
router.get('/map-points', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM map_points');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Obtener todas las mascotas reportadas
router.get('/reported-pets', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reported_pets');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Obtener todos los datos de siembra
router.get('/planting-data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM planting_data');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
