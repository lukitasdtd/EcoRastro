const express = require('express');
const router = express.Router(); 

//importar rutas
const petRoutes = require('./petRoutes');
const reportRoutes = require('./reportroutes');
const userRoutes = require('./userRoutes');
const gardenRoutes = require('./gardenRoutes');

//las rutas principales 
router.use('/pets', petRoutes);
router.use('/reports', reportRoutes);
router.use('/users', userRoutes);
router.use('/gardens', gardenRoutes);

module.exports = router;
