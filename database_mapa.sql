
-- Tabla para las mascotas en el mapa
CREATE TABLE IF NOT EXISTS mascotas_mapa (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  especie VARCHAR(100),
  ubicacion_lat DECIMAL(10, 8) NOT NULL,
  ubicacion_lng DECIMAL(11, 8) NOT NULL,
  fecha_reporte TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para las huertas en el mapa
CREATE TABLE IF NOT EXISTS huertas_mapa (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  ubicacion_lat DECIMAL(10, 8) NOT NULL,
  ubicacion_lng DECIMAL(11, 8) NOT NULL,
  descripcion TEXT,
  responsable VARCHAR(255)
);
