const userRouter = require('express').Router();

const {userController} = require("../controllers");
const {userMiddleware, authMiddleware, commonMiddleware} = require('../middlewares');

userRouter.get('/',
    userMiddleware.isUserQueryValid,
    userController.getAllUsers);
userRouter.get('/:userId',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.getUserById);
userRouter.post('/',
    userMiddleware.isUserValidForCreate,
    userMiddleware.isUserUniq,
    userController.createUser);

userRouter.put('/:userId',
    commonMiddleware.isIdValid,
    userMiddleware.isUserValidForUpdate,
    authMiddleware.checkAccessToken,
    // userMiddleware.isUserPresent,
    userController.updateUserById);
userRouter.delete('/:userId',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,
    // userMiddleware.isUserPresent,
    userController.deleteUserById);

module.exports = userRouter;