const {userService, s3Service} = require('../services');
const {userPresenter} = require("../presenters/user.presenter");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findUsers();

            const usersForResponse = users.map(user => userPresenter(user));
            res.json(usersForResponse);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const { user } = req;

            const userForResponse = userPresenter(user);
            res.json(userForResponse);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const newUser = await userService.createUser(req.body);

            if (!req.files?.avatar) {
                const userForResponse = userPresenter(newUser);
                return res.status(201).json(userForResponse);
            }

            // const { Location } = await s3Service.uploadFile(req.files.avatar, 'user', newUser._id);
            // const userWithPhoto = await userService.updateOneUser({ _id: newUser._id }, { avatar: Location });
            const {_id: userId} = newUser;
            const { Location } = await s3Service.uploadFile(req.files.avatar, 'user', userId);
            const userWithPhoto = await userService.updateOneUser({ _id: userId }, { avatar: Location });

            const userForResponse = userPresenter(userWithPhoto);
            res.status(201).json(userForResponse);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;

            if (req.files?.avatar) {
                if (req.user.avatar) {
                    await s3Service.updateFile(req.files.avatar, req.user.avatar);
                    console.log('update file ');
                } else {
                    const { Location } = await s3Service.uploadFile(req.files.avatar, 'user', userId);
                    console.log('upload file ' + Location);
                    req.body.avatar = Location;
                }
            }

            // Fix bag when sent avatar key without photo
            if (req.body.avatar === '') delete req.body.avatar;

            console.log('#### Upd User - req.body #####');
            console.log(req.body);
            console.log('##############################');

            const updatedUser = await userService.updateOneUser({ _id: userId }, req.body);

            const userForResponse = userPresenter(updatedUser);
            res.status(201).json(userForResponse);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;
            await userService.deleteOneUser({ _id: userId })

            // console.log('#### Del User #####');
            // console.log(req.user);
            // console.log('###################');

            if  (req.user.avatar) {
                await s3Service.deleteFile(req.user.avatar);
            }

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
};