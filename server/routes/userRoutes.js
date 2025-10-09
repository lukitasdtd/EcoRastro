const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { userValidationRules, validate, basicAuth } = require('../middlewares');

// Rutas CRUD para Usuarios
router.post('/', userValidationRules(), validate, basicAuth, userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userValidationRules(), validate, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
