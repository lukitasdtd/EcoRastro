// Rutas para el recurso de usuarios
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ejemplo: POST /api/usuarios
// router.post('/', userController.createUser);

// Ejemplo: GET /api/usuarios
// router.get('/', userController.getUsers);

module.exports = router;
