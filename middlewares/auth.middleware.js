const {constants} = require('../configs');
const {tokenTypeEnum} = require('../enums');
const CustomError = require('../errors/CustomError');
const {tokenService, userService} = require("../services");
const {authValidator} = require('../validators');

module.exports = {
    isLoginBodyValid: async (req, res, next) => {
        try {
            const {error, value} = await authValidator.login.validate(req.body);

            if (error) {
                return next(new CustomError(`Wrong email or password`));
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findOneUser({email});

            if (!user) {
                return next(new CustomError('Wrong email or password'));
            }

            req.userData = user;
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

            tokenService.checkToken(access_token);

            // const {userId: userData} = await tokenService.findTokenPair({access_token}).populate('userId');
            const tokenPairData = await tokenService.findTokenPair({access_token});
            if (!tokenPairData) {
                return next(new CustomError('Token not valid', 401));
            }

            req.tokenData = tokenPairData;
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

            // What actually do CHECK.TOKEN method?
            tokenService.checkToken(refresh_token, tokenTypeEnum.REFRESH);

            const tokenPairData = await tokenService.findTokenPair({refresh_token});
            if (!tokenPairData) {
                return next(new CustomError('Token not valid', 401));
            }
            req.tokenData = tokenPairData;

            next();
        } catch (e) {
            next(e);
        }
    },
}