const User = require('./users.model');

const findUsers = async () => {
  const users = await User.find({});
  return users;
};

const storeUser = async (userToStore) => {
  const user = new User({ ...userToStore });
  const storedUser = await user.save();
  return storedUser;
};

const findUserByUsername = async (username) => {
  const user = await User.findOne({ username });
  return user;
};

const findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

module.exports = {
  findUsers,
  storeUser,
  findUserByUsername,
  findUserById,
};
