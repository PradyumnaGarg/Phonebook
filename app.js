const express = require('express');

const app = express();
const cors = require('cors');
const personsRouter = require('./components/persons/persons.router');
const middleware = require('./utils/middleware');
require('./mongo');

app.use(express.json());
app.use(express.static('build'));
app.use(cors());
app.use(middleware.requestLogger);

app.use('/api/persons', personsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
