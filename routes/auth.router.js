const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middleware');

router.post('/login',
    authMiddleware.isLoginBodyValid,
    authMiddleware.isUserPresentForAuth,
    authController.login);

router.post('/refreshToken',
    authMiddleware.checkRefreshToken,
    authController.refreshToken);

router.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout);

router.post('/logoutAllDevices',
    authMiddleware.checkAccessToken,
    authController.logoutAllDevices);

module.exports = router;