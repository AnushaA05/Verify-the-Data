const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mysecret');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is invalid' });
  }
};

module.exports = authenticate;
