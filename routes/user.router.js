const userRouter = require('express').Router();

const userController = require("../controllers/user.controller");
const commonMiddleware = require('../middlewares/common.middleware');
const userMiddleware = require('../middlewares/user.middleware');

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
    userMiddleware.isUserPresent,
    userController.updateUserById);
userRouter.delete('/:userId',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.deleteUserById);

module.exports = userRouter;