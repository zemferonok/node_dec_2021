const bcrypt = require('bcrypt');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 5),
    comparePassword: (hashPassword, password) => bcrypt.compare(password, hashPassword),
}