// Configuración principal de Express
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// Middlewares ESENCIALES

// 1. Habilitar CORS con configuración explícita y más permisiva para desarrollo.
const corsOptions = {
  origin: 'http://localhost:3000', // Permite solo peticiones de tu frontend de Next.js
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Permite todos los métodos comunes
  credentials: true, // Permite el envío de cookies (importante para sesiones)
  optionsSuccessStatus: 200 // Para compatibilidad con navegadores antiguos
};
app.use(cors(corsOptions));

// 2. Habilitar el parseo de cuerpos de petición en formato JSON.
app.use(express.json());

// 3. Habilitar el parseo de cuerpos de petición codificados en URL.
app.use(express.urlencoded({ extended: true }));

// Rutas de la API - Debe ir DESPUÉS de los middlewares
app.use('/api', routes);

module.exports = app;
