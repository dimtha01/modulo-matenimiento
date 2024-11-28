// Importar el módulo de Express
const express = require('express');
// Crear un enrutador de Express
const router = express.Router();
// Importar el controlador de usuarios
const userController = require('../controllers/userController');

// Definir las rutas para la API de usuarios

// Ruta para crear un nuevo usuario (POST)
router.post('/', userController.createUser);

// Ruta para obtener todos los usuarios (GET)
router.get('/', userController.getUsers);

// Ruta para actualizar un usuario existente por ID (PUT)
router.put('/:id', userController.updateUser);

// Ruta para eliminar un usuario existente por ID (DELETE)
router.delete('/:id', userController.deleteUser); 

// Exportar el enrutador para que pueda ser utilizado en otros archivos
module.exports = router;