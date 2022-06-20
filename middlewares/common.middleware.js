const { Types } = require('mongoose');
const CustomError = require('../errors/CustomError');

module.exports = {
    isIdValid: (req, res, next) => {
        try {
            const { userId } = req.params;

            if (!Types.ObjectId.isValid(userId)) {
                return next(new CustomError('Not valid ID'));
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};