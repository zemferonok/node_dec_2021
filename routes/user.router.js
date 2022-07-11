const userRouter = require('express').Router();

const userController = require("../controllers/user.controller");
const {commonMiddleware, userMiddleware, fileMiddleware} = require('../middlewares')

userRouter.get('/',
    userController.getAllUsers
);
userRouter.get('/:userId',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.getUserById
);
userRouter.post('/',
    userMiddleware.isUserValidForCreate,
    fileMiddleware.checkUserAvatar,
    userMiddleware.isUserUniq,
    userController.createUser
);
userRouter.put('/:userId',
    commonMiddleware.isIdValid,
    fileMiddleware.checkUserAvatar,
    userMiddleware.isUserValidForUpdate,
    userMiddleware.isUserPresent,
    userController.updateUserById
);
userRouter.delete('/:userId',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.deleteUserById
);

module.exports = userRouter;