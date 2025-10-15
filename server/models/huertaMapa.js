
const pool = require('../utils/db');

async function findAll() {
  const client = await pool.connect();
  const query = 'SELECT id, nombre, ubicacion_lat, ubicacion_lng, descripcion, responsable FROM huertas_mapa';
  try {
    const { rows } = await client.query(query);
    return rows;
  } catch (error) {
    console.error('Error fetching gardens for map', error);
    throw new Error('Error al obtener las huertas para el mapa');
  } finally {
    client.release();
  }
}

module.exports = { findAll };
