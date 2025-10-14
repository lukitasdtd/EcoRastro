'use strict';
//rutas para huertas
const express = require('express');
const router = express.Router();
const gardenController = require('../controllers/gardenController');
const { authenticateToken, upload } = require('../middlewares');


// --- RUTA PARA CREAR UNA HUERTA ---
// POST /api/gardens/create
// Requiere autenticación y subida de una sola imagen (campo llamado 'gardenImage')
router.post('/create', authenticateToken, upload.single('gardenImage'), gardenController.createGarden);


// Aquí puedes añadir otras rutas para "gardens" en el futuro (ej. obtener todas, obtener por id, etc.)

// Rutas CRUD para huertas
router.post('/', gardenValidationRules(), validate, gardenController.createGarden);
router.get('/', gardenController.getGardens);
router.get('/:id', gardenController.getGardenById);
router.put('/:id', gardenValidationRules(), validate, gardenController.updateGarden);
router.delete('/:id', gardenController.deleteGarden);

module.exports = router;
