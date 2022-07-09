const userService = require('../services/user.service');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findUsers();
            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const { userData } = req;
            res.json(userData);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const newUser = await userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const {dateForUpdate} = req;
            const updatedUser = await userService.updateOneUser({ _id: userId }, dateForUpdate);
            res.status(201).json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;
            await userService.deleteOneUser({ _id: userId })

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
};