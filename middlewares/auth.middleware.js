const { checkToken } = require("../services/token.service");
const OAuth = require("../dataBase/oauth");
const CustomError = require('../errors/CustomError');
const userService = require('../services/user.service');
const authValidator = require('../validators/auth.validator');
const tokenTypeEnum = require('../enums/token-type.enum');
const constants = require('../configs/constants');

module.exports = {
    isLoginBodyValid: async (req, res, next) => {
        try {
            const { error, value } = await authValidator.login.validate(req.body);

            if (error) {
                console.log('Error isLoginBodyValid', error);
                return next(new CustomError(`Wrong email or password`));
            }

            req.body = value;
            next();
        } catch (e) {
            console.log('ERROR isLoginBodyValid :', e.message);
            next(e);
        }
    },

    isUserPresentForAuth: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await userService.findOneUser({ email });

            if (!user) {
                console.log('Error isUserPresentForAuth - no user found');
                return next(new CustomError('Wrong email or password'));
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(constants.AUTHORIZATION);

            if (!access_token) {
                return next(new CustomError('No token', 401));
            }

            checkToken(access_token);

            // TODO why does it need?
            const tokenInfo = await OAuth.findOne({ access_token }).populate('userId');
            console.log(tokenInfo);

            if (!tokenInfo) {
                return next(new CustomError('Token not valid', 401));
            }

            req.access_token = tokenInfo.access_token;
            req.user = tokenInfo.userId;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(constants.AUTHORIZATION);

            if (!refresh_token) {
                return next(new CustomError('No token', 401));
            }

            checkToken(refresh_token, tokenTypeEnum.REFRESH);

            const tokenInfo = await OAuth.findOne({ refresh_token });

            if (!tokenInfo) {
                return next(new CustomError('Token not valid', 401));
            }

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    },
}