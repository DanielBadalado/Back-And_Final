const authMiddleware = (req, res, next) => {
    // Lógica para verificar se o usuário está autenticado
    const isAuthenticated = true; // verificar se existe um token de autenticação válido
  
    if (!isAuthenticated) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    next();
  };
  
  module.exports = {
    authMiddleware
  };
  