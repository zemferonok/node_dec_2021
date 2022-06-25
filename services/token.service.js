const jwt = require('jsonwebtoken');

const configs = require("../configs/configs");
const CustomError = require('../errors/CustomError');
const tokenTypeEnum = require('../enums/token-type.enum');

function generateAuthTokens(payload = {}) {
    //TODO what should be as 4th params?
    const access_token = jwt.sign(payload, configs.ACCESS_TOKEN_SECRET, {expiresIn: '10m'});
    const refresh_token = jwt.sign(payload, configs.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});

    return {
        access_token,
        refresh_token
    }
}

function checkToken(token = '', tokenType = tokenTypeEnum.ACCESS) {
    try {
        let secret;

        if (tokenType === tokenTypeEnum.ACCESS) secret = configs.ACCESS_TOKEN_SECRET;
        if (tokenType === tokenTypeEnum.REFRESH) secret = configs.REFRESH_TOKEN_SECRET;

        //TODO what should be as 4th params?
        return jwt.verify(token, secret);
    } catch (err) {
        console.log('Error checkToken :', err.message);
        throw new CustomError('Token not valid', 401);
    }
}

// TODO get all in module.export type
module.exports = {
    checkToken,
    generateAuthTokens
}