const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const contactsRouter = require('./components/contacts/contacts.router');
const usersRouter = require('./components/users/users.router');
const middleware = require('./utils/middleware');
require('./mongo');

app.use(express.json());
app.use(express.static('build'));
app.use(cors());
app.use(middleware.requestLogger);

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
