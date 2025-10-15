
-- Tabla para los posts
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  autor VARCHAR(255) NOT NULL,
  ubicacion VARCHAR(255),
  contenido TEXT NOT NULL,
  imagen_url VARCHAR(255),
  likes INT DEFAULT 0,
  fecha_creacion TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para los comentarios
CREATE TABLE IF NOT EXISTS comentarios (
  id SERIAL PRIMARY KEY,
  post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  autor VARCHAR(255) NOT NULL,
  texto TEXT NOT NULL,
  fecha_comentario TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
