const CustomError = require('../errors/CustomError');
const userService = require('../services/user.service');

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await userService.findOneUser({_id: userId});
            if (!user) {
                return next(new CustomError('User not found'));
            }

            req.userData = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValidForCreate: async (req, res, next) => {
        try {
            const {name, email} = req.body;

            if (!name || name.length < 3) {
                return next(new CustomError('Set valid name'));
            }

            if (!email || !email.includes('@')) {
                return next(new CustomError('Set valid email'));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserUniq: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findOneUser({email});
            if (user) {
                return next(new CustomError(`User with email ${email} is exist`, 409));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValidForUpdate: async (req, res, next) => {
        try {
            const {name} = req.body;

            if (name && name.length < 3) {
                return res.status(400).json('Set valid name');
            }

            req.dateForUpdate = {name};
            next();
        } catch (e) {
            next(e);
        }
    }
};