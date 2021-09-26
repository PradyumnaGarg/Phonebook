const jwtOperations = require('./jwt_operations');
const UsersDataAccessLayer = require('../components/users/users.dal');
const ErrorGenerator = require('./error_generator');

const userExtractor = async (request, reponse, next) => {
  if (!request.headers.authorization) {
    return next(new ErrorGenerator(400, 'No authorization token sent in the request'));
  }

  if (!request.headers.authorization.startsWith('Bearer')) {
    return next(new ErrorGenerator(400, 'Authorization token should be of type Bearer token'));
  }

  const token = request.headers.authorization.split(' ')[1];
  const id = jwtOperations.verifyToken(token);
  const user = await UsersDataAccessLayer.findUserById(id);
  request.user = user;
  next();
};

module.exports = userExtractor;
