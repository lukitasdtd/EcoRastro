const express = require('express');
const router = express.Router();

// Corregido: Importar el nuevo middleware de autenticación
const { authenticateToken } = require('../middlewares');

// Rutas para Reportes

// Ruta pública para ver reportes (ejemplo)
// Rutas para Reportes 
router.get('/', (req, res) => res.status(200).send('List of reports')); // Placeholder

// Corregido: Proteger la creación de reportes con authenticateToken en lugar de basicAuth
router.post('/', authenticateToken, (req, res) => res.status(201).send('Report created by user: ' + req.user.rut)); // Placeholder mejorado

module.exports = router;
