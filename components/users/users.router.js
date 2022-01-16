const usersRouter = require('express').Router();
const { request, response } = require('express');
const userExtractor = require('../../utils/auth_middleware');
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

usersRouter.route('/profile')
.get( userExtractor , async (request, response) => {
  const result = await usersController.userProfile(request);
  return response.json({result});
})

usersRouter.route('/changePassword')
.put ( userExtractor, async (request, response) => {
  const result = await usersController.changePassword(request);
  return response.json({result});
})
usersRouter.route('/reset-password')
  .post(async (request, response) => {
    const result = await usersController.resetPassword(request);
    return response.json({ result });
  });
usersRouter.route('/forgot-password')
  .post(async (request, response) => {
    const result = await usersController.forgotPassowrd(request);
    return response.json({ result });
  });

module.exports = usersRouter;
