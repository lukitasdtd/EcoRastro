
CREATE TABLE IF NOT EXISTS mascotas (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  especie VARCHAR(100),
  tamaño VARCHAR(100),
  estado VARCHAR(100),
  descripcion TEXT,
  ubicacion VARCHAR(255),
  fecha_reporte DATE DEFAULT CURRENT_DATE,
  imagen_url VARCHAR(255)
);
