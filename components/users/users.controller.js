const ErrorGenerator = require("../../utils/error_generator");
const UsersDataAccessLayer = require("./users.dal");
const bcrypt = require('bcrypt');
const jwtOperations = require('../../utils/jwt_operations');

const getUsers = async () => {
    const users = UsersDataAccessLayer.findUsers();
    return users;
}

const registerUser = async (request) => {
    const { username, password, name, mobileNumber } = request.body;
    if (!password) {
        throw new ErrorGenerator(401, 'Password is missing in the request');
    }
    if (password.length < 3) {
        throw new ErrorGenerator(400, 'Password is shorter than the minimum allowed length (3).');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const userToStore = { username, passwordHash, name, mobileNumber };
    const storedUser = await UsersDataAccessLayer.storeUser(userToStore);
    return storedUser;
}

const loginUser = async (request) => {
    const { username, password } = request.body;
    if (!username || !password) {
        throw new ErrorGenerator(401, 'Either username or password is missing in the request.');
    }

    const user = await UsersDataAccessLayer.findUser(username);
    if (!user) {
        throw new ErrorGenerator(404, 'Username not found in the database.');
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
        throw new ErrorGenerator(403, 'Invalid password.');
    }

    const token = jwtOperations.createToken(user._id);
    return { token, username, mobileNumber: user.mobileNumber };
}

module.exports = {
    getUsers,
    registerUser,
    loginUser
};
