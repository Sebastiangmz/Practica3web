// Middleware para validar administrador
function validateAdmin(req, res, next) {
  const authHeader = req.headers['x-auth'];
  
  if (authHeader !== 'admin') {
    return res.status(403).json({
      error: 'Acceso no autorizado, no se cuenta con privilegios de administrador'
    });
  }
  
  next();
}

module.exports = {
  validateAdmin
};
