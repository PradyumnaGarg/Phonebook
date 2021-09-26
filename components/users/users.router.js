const usersRouter = require('express').Router();
const usersController = require('./users.controller');

usersRouter.route('/')
  .get(async (request, response) => {
    const result = await usersController.getUsers();
    return response.json({ result });
  });

usersRouter.route('/login')
  .post(async (request, response) => {
    const result = await usersController.loginUser(request);
    return response.json({ result });
  });

usersRouter.route('/register')
  .post(async (request, response) => {
    const result = await usersController.registerUser(request);
    return response.json({ result });
  });

module.exports = usersRouter;
