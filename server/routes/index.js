
const express = require('express');
const router = express.Router(); 

// Importar rutas
const petRoutes = require('./petRoutes');
const reportRoutes = require('./reportroutes');
const userRoutes = require('./userRoutes');
const gardenRoutes = require('./gardenRoutes');
const postRoutes = require('./postRoutes');
const mapaRoutes = require('./mapaRoutes'); // Importamos las nuevas rutas

// Las rutas principales
router.use('/mascotas', petRoutes);
router.use('/reports', reportRoutes);
router.use('/users', userRoutes);
router.use('/gardens', gardenRoutes);
router.use('/posts', postRoutes);
router.use('/mapa', mapaRoutes); // Usamos las nuevas rutas

module.exports = router;
