
const db = require('../utils/db');

async function findAll() {
  const query = 'SELECT * FROM posts ORDER BY fecha_creacion DESC';
  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.error('Error fetching posts', error);
    throw new Error('Error al obtener los posts');
  }
}

async function findById(id) {
  const postQuery = 'SELECT * FROM posts WHERE id = $1';
  const commentsQuery = 'SELECT * FROM comentarios WHERE post_id = $1 ORDER BY fecha_comentario ASC';

  try {
    const postResult = await db.query(postQuery, [id]);
    if (postResult.rows.length === 0) {
      return null;
    }
    const post = postResult.rows[0];

    const commentsResult = await db.query(commentsQuery, [id]);
    post.comentarios = commentsResult.rows;

    return post;
  } catch (error) {
    console.error(`Error fetching post with id ${id}` , error);
    throw new Error('Error al obtener el post');
  }
}

async function create(post) {
  const { autor, ubicacion, contenido, imagen_url } = post;
  const query = 'INSERT INTO posts (autor, ubicacion, contenido, imagen_url) VALUES ($1, $2, $3, $4) RETURNING *';
  const params = [autor, ubicacion, contenido, imagen_url];

  try {
    const { rows } = await db.query(query, params);
    return rows[0];
  } catch (error) {
    console.error('Error creating post', error);
    throw new Error('Error al crear el post');
  }
}

async function addLike(id) {
  const query = 'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING likes';

  try {
    const { rows } = await db.query(query, [id]);
    if (rows.length === 0) {
      return null; // El post no fue encontrado
    }
    return rows[0];
  } catch (error) {
    console.error(`Error adding like to post with id ${id}`, error);
    throw new Error('Error al dar me gusta al post');
  }
}

module.exports = {
  findAll,
  findById,
  create,
  addLike,
};
