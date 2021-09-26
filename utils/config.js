require('dotenv').config();

const PORT = process.env.PORT || 2000;
const { MONGODB_URL, JWT_SECRET } = process.env;

module.exports = {
  MONGODB_URL,
  PORT,
  JWT_SECRET,
};
