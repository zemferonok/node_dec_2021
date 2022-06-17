const express = require('express');

const {fileService} = require('./services/file.service')

const app = express();
app.use(express.json());

// GET ALL
app.get('/users', async (req, res) => {
    const users = await fileService.reader()
    res.json(users);
});

// GET ONE
app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params;

    const users = await fileService.reader();
    const user = users.find((user) => user.id === +userId);
    if (!user) return res.status(400).json(`User ${userId} not found`);

    res.json(user);
});

// CREATE
app.post('/users', async (req, res) => {
    const {name, age} = req.body;
    if (!name || !age) return res.status(400).json('Set valid data {"name": ..., "age": ...}');

    const users = await fileService.reader();
    const id = users[users.length - 1] ? users[users.length - 1].id + 1 : 1
    const newUser = {id, name, age}

    await fileService.writer([...users, newUser]);
    res.status(201).json(newUser);
});

// UPDATE
app.put('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const {name, age} = req.body;

    const users = await fileService.reader();
    const index = users.findIndex((user)=> user.id === +userId);
    if (index === -1) return res.status(400).json(`User ${userId} not found`);
    if (!name || !age) return res.status(400).json('Set valid data');

    // const userForUpdate = {...users[index], ...req.body};
    const userForUpdate = Object.assign(users[index], res.body);
    users[index] = userForUpdate;
    await fileService.writer(users);

    res.status(201).json(userForUpdate);
});

// DELETE
app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params;

    const users = await fileService.reader();
    const index = users.findIndex((user) => user.id === +userId);
    if (index === -1) return res.status(400).json(`User ${userId} not found`);

    users.splice(index, 1);
    await fileService.writer(users);
    res.sendStatus(204);
});

app.listen(5000, () => {
    console.log('Server listen 5000 ', new Date())
});