export default function (allowedRoles = []) {
  return function (req, res, next) {
    if (!req.user) return res.status(401).json({ message: 'UnauthMiddleware.jsenticated' });
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient privileges' });
    }
    next();
  };
};
