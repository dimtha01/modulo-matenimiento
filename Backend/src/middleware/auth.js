// Middleware de autenticación (ejemplo básico sin restricciones)
module.exports = (req, res, next) => {
  // Simplemente permite el acceso a todas las solicitudes
  next();
};