
const db = require('../utils/db');

async function create(postId, comment) {
  const { autor, texto } = comment;
  const query = 'INSERT INTO comentarios (post_id, autor, texto) VALUES ($1, $2, $3) RETURNING *';
  const params = [postId, autor, texto];

  try {
    const { rows } = await db.query(query, params);
    return rows[0];
  } catch (error) {
    console.error(`Error creating comment for post ${postId}`, error);
    throw new Error('Error al agregar el comentario');
  }
}

module.exports = {
  create,
};
