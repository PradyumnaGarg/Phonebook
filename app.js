const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('express-async-errors');
require('./mongo');
const contactsRouter = require('./components/contacts/contacts.router');
const usersRouter = require('./components/users/users.router');
const middleware = require('./utils/middleware');

const app = express();

app.use(express.json());
app.use(express.static('build'));
app.use(cors());
app.use(middleware.requestLogger);
app.use(morgan('dev'));

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
