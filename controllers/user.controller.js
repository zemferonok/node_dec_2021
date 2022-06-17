const fileService = require("../services/file.service");

module.exports = {
    getAll: async (req, res) => {
        try {
            const users = await fileService.reader()
            res.json(users);
        } catch (err) {
            res.status(400).json(err.message || 'Unknown Error')
        }
    },
    getById: async (req, res) => {
        try {
            const {userId} = req.params;

            const users = await fileService.reader();
            const user = users.find((user) => user.id === +userId);
            if (!user) return res.status(400).json(`User ${userId} not found`);

            res.json(user);
        } catch (err) {
            res.status(400).json(err.message || 'Unknown Error')
        }
    },
    create: async (req, res) => {
        try {
            const {name, age} = req.body;
            if (!name || !age) return res.status(400).json('Set valid data {"name": ..., "age": ...}');

            const users = await fileService.reader();
            const id = users[users.length - 1] ? users[users.length - 1].id + 1 : 1
            const newUser = {id, name, age}

            await fileService.writer([...users, newUser]);
            res.status(201).json(newUser);
        } catch (err) {
            res.status(400).json(err.message || 'Unknown Error')
        }
    },
    updateById: async (req, res) => {
        try {
            const {userId} = req.params;
            const {name, age} = req.body;

            const users = await fileService.reader();
            const index = users.findIndex((user) => user.id === +userId);
            if (index === -1) return res.status(400).json(`User ${userId} not found`);
            if (!name || !age) return res.status(400).json('Set valid data');

            // const userForUpdate = {...users[index], ...req.body};
            const userForUpdate = Object.assign(users[index], res.body);
            users[index] = userForUpdate;
            await fileService.writer(users);

            res.status(201).json(userForUpdate);
        } catch (err) {
            res.status(400).json(err.message || 'Unknown Error')
        }
    },
    deleteById: async (req, res) => {
        try {
            const {userId} = req.params;

            const users = await fileService.reader();
            const index = users.findIndex((user) => user.id === +userId);
            if (index === -1) return res.status(400).json(`User ${userId} not found`);

            users.splice(index, 1);
            await fileService.writer(users);
            res.sendStatus(204);
        } catch (err) {
            res.status(400).json(err.message || 'Unknown Error')
        }
    },
}