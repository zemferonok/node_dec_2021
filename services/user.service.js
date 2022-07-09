const UsersDB = require('../dataBase/users.js');

module.exports = {
    findUsers: (params = {}) => {
        return UsersDB.find(params);
    },
    findOneUser: (params = {}) => {
        return UsersDB.findOne(params);
    },
    createUser: (user) => {
        return UsersDB.create(user);
    },
    updateOneUser: (params, userData, options = { new: true }) => {
        return UsersDB.findOneAndUpdate(params, userData, options);
    },
    deleteOneUser: (params = {}) => {
        return UsersDB.deleteOne(params);
    },
}