
// Importar el módulo 'fs' para manejar el sistema de archivos
const fs = require('fs');
// Importar el módulo 'path' para manejar rutas de archivos
const path = require('path');
// Definir la ruta del archivo JSON donde se almacenan los usuarios
const dataPath = path.join(__dirname, '../../data/users.json');

// Función para leer usuarios desde el archivo JSON
const readUsers = () => {
    try {
        // Leer el contenido del archivo JSON en formato de texto
        const data = fs.readFileSync(dataPath, 'utf-8');
        // Parsear el contenido JSON y devolverlo como un objeto JavaScript
        return JSON.parse(data);
    } catch (error) {
        // Manejar errores al leer el archivo, imprimir mensaje en consola
        console.error('Error al leer el archivo de usuarios:', error);
        return []; // Retornar un arreglo vacío en caso de error
    }
};

// Función para escribir usuarios en el archivo JSON
const writeUsers = (users) => {
    try {
        // Convertir el arreglo de usuarios a formato JSON y escribirlo en el archivo
        fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
    } catch (error) {
        // Manejar errores al escribir en el archivo, imprimir mensaje en consola
        console.error('Error al escribir en el archivo de usuarios:', error);
        throw new Error('No se pudo escribir en el archivo de usuarios.'); // Lanzar un error para manejarlo en otro lugar
    }
};

// Exportar las funciones para que puedan ser utilizadas en otros módulos
module.exports = {
    readUsers,
    writeUsers
};