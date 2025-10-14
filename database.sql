-- =============================================================================
-- Script de Base de Datos para Ecorastro
-- =============================================================================
-- Este archivo contiene todas las sentencias SQL para crear la estructura
-- completa de la base de datos del proyecto. Ejecútalo en tu base de datos
-- PostgreSQL para configurar el entorno de desarrollo.
--
-- Uso:
-- psql -U tu_usuario -d tu_base_de_datos -f database.sql
-- =============================================================================

-- -------- Tabla de Usuarios --------
-- Almacena la información esencial de los usuarios registrados.

DROP TABLE IF EXISTS usuarios CASCADE;
CREATE TABLE usuarios (
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    rut VARCHAR(12) PRIMARY KEY,            -- RUT del usuario, es la llave primaria.
    correo VARCHAR(255) UNIQUE NOT NULL,    -- Correo electrónico, debe ser único.
    psswd VARCHAR(255) NOT NULL,            -- Contraseña hasheada.
    fecha_registro TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_usuarios_correo ON usuarios(correo);

-- -------- Tabla de Huertas --------
-- Almacena la información de las huertas comunitarias publicadas por los usuarios.

DROP TABLE IF EXISTS huertas CASCADE;
CREATE TABLE huertas (
    id SERIAL PRIMARY KEY,                          -- Identificador único de la huerta.
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    direccion JSONB NOT NULL,                       -- Objeto JSON con {calle, comuna, region}.
    image_url VARCHAR(255),                         -- URL o ruta a la imagen de la huerta.
    user_rut VARCHAR(12) NOT NULL,                  -- RUT del usuario que publica la huerta.
    cont_email VARCHAR(255),
    cont_tel VARCHAR(20),
    fecha_creacion TIMESTAMPTZ DEFAULT NOW(),

    -- Relación con la tabla de usuarios
    CONSTRAINT fk_user
        FOREIGN KEY(user_rut)
        REFERENCES usuarios(rut)
        ON DELETE CASCADE                       -- Si se borra un usuario, se borran sus huertas.
);
CREATE INDEX idx_huertas_user_rut ON huertas(user_rut);

-- -------- Tabla de Mascotas Reportadas --------
-- Almacena los reportes de mascotas (encontradas o perdidas).

DROP TABLE IF EXISTS mascotas_reportadas CASCADE;
CREATE TABLE mascotas_reportadas (
    id SERIAL PRIMARY KEY,                          -- Identificador único del reporte.
    nombre_mascota VARCHAR(100) NOT NULL,
    especie VARCHAR(50) NOT NULL,                   -- Ej: Perro, Gato, etc.
    raza VARCHAR(100),
    color VARCHAR(100),
    tamano VARCHAR(50),                             -- Ej: Pequeño, Mediano, Grande.
    descripcion TEXT NOT NULL,
    image_url VARCHAR(255),                         -- URL o ruta a la imagen de la mascota.
    ultimo_lugar_visto VARCHAR(255),
    fecha_reporte TIMESTAMPTZ DEFAULT NOW(),
    estado_reporte VARCHAR(50) NOT NULL,            -- Ej: 'encontrado', 'perdido'.
    user_rut VARCHAR(12) NOT NULL,                  -- RUT del usuario que crea el reporte.

    -- Relación con la tabla de usuarios
    CONSTRAINT fk_user
        FOREIGN KEY(user_rut)
        REFERENCES usuarios(rut)
        ON DELETE CASCADE                       -- Si se borra un usuario, se borran sus reportes.
);
CREATE INDEX idx_mascotas_user_rut ON mascotas_reportadas(user_rut);

-- =============================================================================
-- ¡Script finalizado! La base de datos está lista para ser usada.
-- =============================================================================
