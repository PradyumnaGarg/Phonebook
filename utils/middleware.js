const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method: ', request.method);
  logger.info('Path:   ', request.path);
  logger.info('Body:   ', request.body);
  logger.info('------');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  if (error.status) {
    response.status(error.status).json({ error: error.message });
  } else if (error.message) {
    response.status(400).json({ error: error.message });
  } else {
    response.status(500).json({ error: error.message });
  }
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
