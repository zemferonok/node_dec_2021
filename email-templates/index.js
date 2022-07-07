const { emailActionEnum } = require('../enums');

module.exports = {
    [emailActionEnum.LOGIN]: {
        subject: 'Welcome on board',    // The text for the letter description field
        template: 'login'               // The naming of the viewing file (login.hbs)
    },

    [emailActionEnum.FORGOT_PASSWORD]: {
        subject: 'Ops, looks like you forgot password',
        template: 'forgot-password'
    },

    [emailActionEnum.LOGOUT]: {
        subject: 'Account was blocked',
        template: 'logout'
    },

    [emailActionEnum.DELETE_ACCOUNT]: {
        subject: 'Account was deleted',
        template: 'delete-account',
    },
}