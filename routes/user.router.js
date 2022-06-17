const userRouter = require('express').Router();
// ?Make a copy of express but for Router

const userController = require("../controllers/user.controller");

userRouter.get('/', userController.getAll);
userRouter.get('/:userId', userController.getById);
userRouter.post('/', userController.create);
userRouter.put('/:userId', userController.updateById);
userRouter.delete('/:userId', userController.deleteById);

module.exports = userRouter;