const {userService, passwordService} = require('../services');
const {userPresenter} = require("../presenters/user.presenter");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findUsers(req.query);

            const usersForResponse = users.map(user => userPresenter(user))

            res.json(usersForResponse);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hash = await passwordService.hashPassword(req.body.password);

            const newUser = await userService.createUser({...req.body, password: hash});

            const userForResponse = userPresenter(newUser);

            res.status(201).json(userForResponse);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const {userData} = req;

            const userForResponse = userPresenter(userData);

            res.json(userForResponse);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const updatedUser = await userService.updateOneUser({_id: userId}, req.body);
            const userForResponse = userPresenter(updatedUser);

            res.status(201).json(userForResponse);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;
            await userService.deleteOneUser({_id: userId})

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
};