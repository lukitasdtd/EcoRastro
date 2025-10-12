const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const { petValidationRules, validate, basicAuth } = require('../middlewares');

// Rutas CRUD para Mascotas
router.post('/', petValidationRules(), validate, petController.createPet);
router.get('/', petController.getPets);
router.get('/:id', petController.getPetById);
router.put('/:id', petValidationRules(), validate, petController.updatePet);
router.delete('/:id', petController.deletePet);

// Ruta para reportar una mascota perdida
router.post('/report', basicAuth, petController.reportPet);

module.exports = router;
