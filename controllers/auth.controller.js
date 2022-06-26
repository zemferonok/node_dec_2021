const {tokenService, passwordService} = require('../services');
const {userPresenter} = require("../presenters/user.presenter");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {password: hashPassword, _id} = req.userData;

            await passwordService.comparePassword(hashPassword, password);

            const tokenPair = tokenService.generateTokenPair();
            await tokenService.writeTokenPair({userId: _id, ...tokenPair})

            res.json({
                user: userPresenter(req.userData),
                tokens: tokenPair,
            });
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const {refresh_token} = req.tokenData;

            const newTokenPair = tokenService.generateTokenPair();
            // await tokenService.updateOneTokenPair({refresh_token},{...req.tokenData, ...newTokenPair});
            await tokenService.updateTokenPair({refresh_token},{...newTokenPair});

            res.json({tokens: newTokenPair});
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {access_token} = req.tokenData;

            await tokenService.deleteTokenPair({access_token});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },

    logoutAllDevices: async (req, res, next) => {
        try {
            const {userId} = req.tokenData;

            await tokenService.deleteAllTokenPairs({userId});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
};