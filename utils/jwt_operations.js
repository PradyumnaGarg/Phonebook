const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const createToken = (id) => {
  const token = jwt.sign({ id }, JWT_SECRET);
  return token;
};

const verifyToken = (token) => {
  const { id } = jwt.verify(token, JWT_SECRET);
  return id;
};

module.exports = {
  createToken,
  verifyToken,
};
