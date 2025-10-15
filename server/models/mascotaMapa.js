
const db = require('../utils/db');

async function findAll() {
  const query = 'SELECT id, nombre, especie, ubicacion_lat, ubicacion_lng, fecha_reporte FROM mascotas_mapa';
  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.error('Error fetching pets for map', error);
    throw new Error('Error al obtener las mascotas para el mapa');
  }
}

module.exports = { findAll };
