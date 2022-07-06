const { emailService } = require('../services');
const { emailActionEnum } = require('../enums');
const router = require('express').Router();

router.route('/login')
    .post(async (req, res) => {
        const { email, name } = req.body;
        await emailService.sendMail(email, emailActionEnum.LOGIN, { name });
        res.sendStatus(204);
    });
router.route('/logout')
    .post(async (req, res) => {
        const { email, name } = req.body;
        await emailService.sendMail(email, emailActionEnum.LOGOUT, { name });
        res.sendStatus(204);
    });
router.route('/forgot')
    .post(async (req, res) => {
        const { email, name } = req.body;
        await emailService.sendMail(email, emailActionEnum.FORGOT_PASSWORD, { name });
        res.sendStatus(204);
    });
router.route('/delete')
    .post(async (req, res) => {
        const { email, name } = req.body;
        await emailService.sendMail(email, emailActionEnum.DELETE_ACCOUNT, { name });
        res.sendStatus(204);
    });

module.exports = router;