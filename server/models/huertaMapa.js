
const db = require('../utils/db');

async function findAll() {
  const query = 'SELECT id, nombre, ubicacion_lat, ubicacion_lng, descripcion, responsable FROM huertas_mapa';
  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.error('Error fetching gardens for map', error);
    throw new Error('Error al obtener las huertas para el mapa');
  }
}

module.exports = { findAll };
