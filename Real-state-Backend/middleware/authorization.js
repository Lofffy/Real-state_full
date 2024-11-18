// Middleware to allow access only for specific roles
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden: You do not have permission to access this resource' });
      }
      next();
    };
  };
  
  module.exports = { authorize };
  