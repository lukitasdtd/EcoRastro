// Rutas para el recurso de mascotas
const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

// Ejemplo: POST /api/mascotas/reportar
// router.post('/reportar', petController.reportPet);

// Ejemplo: GET /api/mascotas
// router.get('/', petController.getReportedPets);

module.exports = router;
