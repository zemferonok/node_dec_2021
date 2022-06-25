const bcrypt = require('bcrypt');
const CustomError = require("../errors/CustomError");

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 5),
    comparePassword: async (hashPassword, password) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword);
        if (!isPasswordsSame) {
            console.log('ERROR isPasswordTheSame - NO');
            throw new CustomError(`Wrong email or password`);
        }
    },
}