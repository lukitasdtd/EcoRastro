const express = require('express');
const router = express.Router();

// Corregido: Importar el nuevo middleware de autenticaci�n
const { authenticateToken } = require('../middlewares');

// Rutas para Reportes

// Ruta p�blica para ver reportes (ejemplo)
// Rutas para Reportes 
router.get('/', (req, res) => res.status(200).send('List of reports')); // Placeholder

// Corregido: Proteger la creaci�n de reportes con authenticateToken en lugar de basicAuth
router.post('/', authenticateToken, (req, res) => res.status(201).send('Report created by user: ' + req.user.rut)); // Placeholder mejorado

module.exports = router;
