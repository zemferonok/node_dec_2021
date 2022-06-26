const jwt = require('jsonwebtoken');

const {configs} = require("../configs");
const CustomError = require('../errors/CustomError');
const {tokenTypeEnum} = require('../enums');

module.exports = {
    checkToken: (token = '', tokenType = tokenTypeEnum.ACCESS) => {
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
    },

    generateAuthTokens: (payload = {}) => {
        //TODO what should be as 4th params?
        const access_token = jwt.sign(payload, configs.ACCESS_TOKEN_SECRET, {expiresIn: '1m'});
        const refresh_token = jwt.sign(payload, configs.REFRESH_TOKEN_SECRET, {expiresIn: '10h'});

        return {
            access_token,
            refresh_token
        }
    }
}


// module.exports = {
//     findUsers: (params = {}) => {
//         return users.find(params);
//     },
//     findOneUser: (params = {}) => {
//         return users.findOne(params);
//     },
//     createUser: (user) => {
//         return users.create(user);
//     },
//     updateOneUser: (params, userData, options = {new: true}) => {
//         return users.findOneAndUpdate(params, userData, options);
//     },
//     deleteOneUser: (params = {}) => {
//         return users.deleteOne(params);
//     },
// }