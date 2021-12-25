const hash = require('crypto');
const bcrypt = require('bcrypt');

const ValidateAuth = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
}

const HashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5));
}

export {
    ValidateAuth,
    HashPassword
}
