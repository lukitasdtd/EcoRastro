
const db = require('../utils/db');

async function findPets(filters) {
  let query = 'SELECT * FROM mascotas';
  const params = [];
  let paramIndex = 1;
  const whereClauses = [];

  if (filters.palabrasClave) {
    whereClauses.push(`(nombre ILIKE $${paramIndex} OR descripcion ILIKE $${paramIndex})`);
    params.push(`%${filters.palabrasClave}%`);
    paramIndex++;
  }

  if (filters.especie) {
    whereClauses.push(`especie = $${paramIndex}`);
    params.push(filters.especie);
    paramIndex++;
  }

  if (filters.estado) {
    whereClauses.push(`estado = $${paramIndex}`);
    params.push(filters.estado);
    paramIndex++;
  }

  if (filters.tamaño) {
    whereClauses.push(`tamaño = $${paramIndex}`);
    params.push(filters.tamaño);
    paramIndex++;
  }

  if (whereClauses.length > 0) {
    query += ' WHERE ' + whereClauses.join(' AND ');
  }

  try {
    const { rows } = await db.query(query, params);
    return rows;
  } catch (error) {
    console.error('Error executing query', error);
    throw new Error('Error al buscar las mascotas');
  }
}

module.exports = {
  findPets,
};
