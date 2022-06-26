const {users} = require('../dataBase');

module.exports = {
    findUsers: (params = {}) => {
        return users.find(params);
    },
    findOneUser: (params = {}) => {
        return users.findOne(params);
    },
    createUser: (user) => {
        return users.create(user);
    },
    updateOneUser: (params, userData, options = { new: true }) => {
        return users.findOneAndUpdate(params, userData, options);
    },
    deleteOneUser: (params = {}) => {
        return users.deleteOne(params);
    },
}