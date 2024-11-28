// Importar las dependencias necesarias
const express = require('express'); // Framework para construir aplicaciones web
const fs = require('fs'); // Módulo para trabajar con archivos
const path = require('path'); // Módulo para manejar rutas de archivos
const dotenv = require('dotenv'); // Cargar variables de entorno desde un archivo .env
const cors = require('cors'); // Importar el paquete CORS
const userRoutes = require('./routes/userRoutes'); // Importar las rutas de usuarios

// Configurar dotenv para que lea el archivo .env
dotenv.config();

// Crear una instancia de la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000; // Definir el puerto

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

// Usar CORS para permitir todas las solicitudes desde cualquier origen
app.use(cors()); // Permitir todas las solicitudes desde cualquier origen

// Definir la ruta del archivo JSON como "base de datos"
const DATABASE_FILE = path.join(__dirname, 'data', 'users.json');

// Middleware para verificar si el archivo JSON existe, si no, crearlo
if (!fs.existsSync(DATABASE_FILE)) {
    // Crear el directorio 'data' si no existe
    fs.mkdirSync(path.dirname(DATABASE_FILE), { recursive: true }); // Asegúrate de que la carpeta exista

    // Crear un archivo JSON vacío (array)
    fs.writeFileSync(DATABASE_FILE, JSON.stringify([])); 
    console.log('Archivo de base de datos creado.');
}

// Hacer que el archivo JSON sea accesible para las rutas
app.use((req, res, next) => {
    req.databaseFile = DATABASE_FILE; // Hacer accesible el archivo JSON a las rutas
    next();
});

// Configurar las rutas de la API
app.use('/api/users', userRoutes);

// Iniciar el servidor y escuchar en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});