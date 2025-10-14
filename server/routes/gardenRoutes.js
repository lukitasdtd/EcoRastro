'use strict';
const express = require('express');
const router = express.Router();
const gardenController = require('../controllers/gardenController');
const { authenticateToken, upload } = require('../middlewares');


// --- RUTA PARA CREAR UNA HUERTA ---
// POST /api/gardens/create
// Requiere autenticaci�n y subida de una sola imagen (campo llamado 'gardenImage')
router.post('/create', authenticateToken, upload.single('gardenImage'), gardenController.createGarden);


// Aqu� puedes a�adir otras rutas para "gardens" en el futuro (ej. obtener todas, obtener por id, etc.)


module.exports = router;
