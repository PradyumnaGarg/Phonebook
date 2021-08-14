require('dotenv').config();

const PORT = process.env.PORT || 2000;
const { MONGODB_URL } = process.env;

module.exports = {
  MONGODB_URL,
  PORT,
};
