const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { userValidationRules, validate, basicAuth } = require('../middlewares');

// Rutas CRUD para Usuarios
router.post('/', userController.createUser); // Eliminado middleware de validación y autenticación
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.get('/email/:email', userController.getUserByEmail);
router.put('/:id', userValidationRules(), validate, userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.loginUser);

module.exports = router;
