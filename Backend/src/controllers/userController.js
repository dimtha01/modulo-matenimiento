// controllers/userController.js

// Importar las funciones para leer y escribir usuarios desde el archivo
const { readUsers, writeUsers } = require('../models/user');

// Función para crear un nuevo usuario
exports.createUser = (req, res) => {
    const users = readUsers();

    const { fecha_solicitud, fecha_programada, area, descripcion, estado, prioridad, nombre_solicitante } = req.body;
    
    if (!fecha_solicitud || !fecha_programada || !area || !descripcion || !estado || !prioridad || !nombre_solicitante) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    // Generar un nuevo ID basado en el último usuario existente
    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        fecha_solicitud,
        fecha_programada,
        area,
        descripcion,
        estado,
        prioridad,
        nombre_solicitante
    };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json({
        message: 'Solicitud de mantenimiento creada exitosamente',
        user: newUser
    });
};

// Función para obtener todos los usuarios
exports.getUsers = (req, res) => {
    // Leer los usuarios desde el archivo
    const users = readUsers();
    // Devolver la lista de usuarios con un estado 200 (OK)
    res.status(200).json(users);
};

// Función para actualizar un usuario existente por ID
exports.updateUser = (req, res) => {
    // Obtener el ID del usuario desde los parámetros de la solicitud
    const userId = parseInt(req.params.id);
    const updatedData = req.body; // Obtener los datos actualizados desde el cuerpo de la solicitud

    // Leer los usuarios desde el archivo
    let users = readUsers();
    // Buscar el índice del usuario a actualizar
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        // Si se encuentra el usuario, actualizar sus datos
        users[userIndex] = { ...users[userIndex], ...updatedData };
        // Escribir la lista actualizada en el archivo
        writeUsers(users);

        // Devolver una respuesta exitosa con el usuario actualizado
        res.status(200).json({
            message: 'Usuario actualizado exitosamente',
            user: users[userIndex]
        });
    } else {
        // Si no se encuentra el usuario, devolver un error 404 (Not Found)
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

// Función para eliminar un usuario existente por ID
exports.deleteUser = (req, res) => {
    // Obtener el ID del usuario desde los parámetros de la solicitud
    const userId = parseInt(req.params.id);

    // Leer los usuarios desde el archivo
    let users = readUsers();

    // Buscar el índice del usuario a eliminar
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        // Si se encuentra el usuario, eliminarlo del arreglo
        users.splice(userIndex, 1);
        // Escribir la lista actualizada en el archivo
        writeUsers(users);

        // Devolver una respuesta exitosa indicando que se eliminó al usuario
        res.status(200).json({
            message: 'Usuario eliminado exitosamente'
        });
    } else {
        // Si no se encuentra el usuario, devolver un error 404 (Not Found)
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};