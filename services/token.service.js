const jwt = require('jsonwebtoken');

const {configs} = require("../configs");
const CustomError = require('../errors/CustomError');
const {tokenTypeEnum} = require('../enums');
const {oauth} = require('../dataBase');

module.exports = {
    findTokenPair: (params = {}) => {
        return oauth.findOne(params);
    },

    updateTokenPair: (params={}, newTokenPairData, options = { new: true }) => {
        return oauth.findOneAndUpdate(params, newTokenPairData, options);
    },

    writeTokenPair: (params = {}) => {
        return oauth.create(params);
    },

    deleteTokenPair: (params = {}) => {
        return oauth.deleteOne(params);
    },

    deleteAllTokenPairs: (params = {}) => {
        return oauth.deleteMany(params);
    },

    checkToken: (token = '', tokenType = tokenTypeEnum.ACCESS) => {
        try {
            let secret;

            if (tokenType === tokenTypeEnum.ACCESS) secret = configs.ACCESS_TOKEN_SECRET;
            if (tokenType === tokenTypeEnum.REFRESH) secret = configs.REFRESH_TOKEN_SECRET;

            // How actually work jwt.verify?
            return jwt.verify(token, secret);
        } catch (err) {
            console.log('token.service: ', err.message);
            throw new CustomError('Token not valid', 401);
        }
    },

    generateTokenPair: (payload = {}) => {
        // How actually work jwt.sign?
        const access_token = jwt.sign(payload, configs.ACCESS_TOKEN_SECRET, {expiresIn: '1m'});
        const refresh_token = jwt.sign(payload, configs.REFRESH_TOKEN_SECRET, {expiresIn: '10h'});

        return {
            access_token,
            refresh_token
        }
    }
}
