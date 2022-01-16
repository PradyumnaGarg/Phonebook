const bcrypt = require('bcrypt');
const ErrorGenerator = require('../../utils/error_generator');
const UsersDataAccessLayer = require('./users.dal');
const jwtOperations = require('../../utils/jwt_operations');
const { mailer } = require('../../utils/mail_transporter');

const getUsers = async () => {
  const users = UsersDataAccessLayer.findUsers();
  return users;
};

const registerUser = async (request) => {
  const {
    username, password, firstName, lastName, mobileNumber,
  } = request.body;
  if (!password) {
    throw new ErrorGenerator(401, 'Password is missing in the request');
  }
  if (password.length < 3) {
    throw new ErrorGenerator(400, 'Password is shorter than the minimum allowed length (3).');
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const userToStore = {
    username, passwordHash, firstName, lastName, mobileNumber,
  };
  const storedUser = await UsersDataAccessLayer.storeUser(userToStore);
  return storedUser;
};

const loginUser = async (request) => {
  const { username, password } = request.body;
  if (!username || !password) {
    throw new ErrorGenerator(401, 'Either username or password is missing in the request.');
  }

  const user = await UsersDataAccessLayer.findUserByUsername(username);
  if (!user) {
    throw new ErrorGenerator(404, 'Username not found in the database.');
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!passwordCorrect) {
    throw new ErrorGenerator(403, 'Invalid password.');
  }

  const token = jwtOperations.createToken(user._id);
  return { token, username, mobileNumber: user.mobileNumber };
};

const userProfile = async (request) => {
  if(!request.user){
    throw new ErrorGenerator(404, 'Cannot retrieve profile details at the moment');
  }
  return request.user;
}

const changePassword = async (request) => {
  const { password, newPassword } = request.body;
  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
  if(!passwordCorrect) {
    throw new ErrorGenerator(401, 'Invalid Password');
  }
  const newPasswordHash = await bcrypt.hash(newPassword, 10);
  const updatedUser = { _id: request.user._id, passwordHash: newPasswordHash};
  const updatedUserInDB = await UsersDataAccessLayer.updateUser(updatedUser);
  return updatedUserInDB;
}
const forgotPassowrd = async (request) => {
  const { username } = request.body;
  const user = await UsersDataAccessLayer.findUserByUsername(username);
  if (!user) {
    throw new ErrorGenerator(404, 'Email not found');
  }

  const mailBody = {
    username: user.username,
    _id: user._id,
  };

  const mailResult = await mailer(mailBody);

  if (!mailResult) {
    throw new ErrorGenerator(500, 'Email not sent');
  }

  return { message: 'Email sent successfully' };
};

const resetPassword = async (request) => {
  const { password } = request.body;
  // const user = await UsersDataAccessLayer.
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  userProfile,
  changePassword,
  forgotPassowrd,
  resetPassword,
};
