'use strict';
const express = require('express');
const router = express.Router();
const gardenController = require('../controllers/gardenController');
const { authenticateToken, upload } = require('../middlewares');

// --- RUTA PARA OBTENER TODAS LAS HUERTAS ---
// GET /api/gardens
router.get('/', gardenController.getGardens);

// --- RUTA PARA OBTENER UNA HUERTA POR ID ---
// GET /api/gardens/:id
router.get('/:id', gardenController.getGardenById);

// --- RUTA PARA CREAR UNA HUERTA ---
// POST /api/gardens/create
// Requiere autenticacin y subida de una sola imagen (campo llamado 'gardenImage')
router.post('/create', authenticateToken, upload.single('gardenImage'), gardenController.createGarden);

module.exports = router;
