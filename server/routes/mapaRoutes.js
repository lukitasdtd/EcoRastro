
const express = require('express');
const router = express.Router();
const mapaMascotasController = require('../controllers/mapaMascotasController');
const mapaHuertasController = require('../controllers/mapaHuertasController');

router.get('/mascotas', mapaMascotasController.getMascotas);
router.get('/huertas', mapaHuertasController.getHuertas);

module.exports = router;
