// Rutas principales de la API
const express = require('express');
const router = express.Router();

const petRoutes = require('./petRoutes');
const userRoutes = require('./userRoutes');
const gardenRoutes = require('./gardenRoutes');

// Rutas para cada recurso
router.use('/mascotas', petRoutes);
router.use('/usuarios', userRoutes);
router.use('/huertas', gardenRoutes);

module.exports = router;
