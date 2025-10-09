const express = require('express');
const router = express.Router();
// const reportController = require('../controllers/reportController'); 
const { basicAuth } = require('../middlewares');

// Rutas para Reportes
router.get('/', (req, res) => res.status(200).send('List of reports')); // Placeholder
router.post('/', basicAuth, (req, res) => res.status(201).send('Report created')); // Placeholder

module.exports = router;
