const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const { petValidationRules, validate } = require('../middlewares');

// Rutas CRUD para Mascotas (2)
router.post('/', petValidationRules(), validate, petController.createPet);
router.get('/', petController.getPets);
router.get('/:id', petController.getPetById);
router.put('/:id', petValidationRules(), validate, petController.updatePet);
router.delete('/:id', petController.deletePet);

module.exports = router;
