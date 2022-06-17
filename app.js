const express = require('express');

const {users} = require('./dataBase/users')

const app = express();
app.use(express.json());    // For using req.body & req.params data

app.get('/', (req, res) => {
    res.status(200).json('Response to client..{Root}')
}); // The response must be, but it can be only one. req - info obj from client

// GET ALL
app.get('/users', (req, res) => {
    res.json(users);    // If the response is without status it will be 200 as the default
});

// CREATE
app.post('/users', (req, res) => {
    const {name, age} = req.body;
    if (!name || !age) return res.status(400).json('Set valid data {"name": ..., "age": ...}');

    const id = users[users.length - 1] ? users[users.length - 1].id + 1 : 1
    const newUser = {id, name, age,}
    users.push(newUser);

    res.status(201).json(newUser);
});

// DELETE
app.delete('/users/:userId', (req, res) => {
    const {userId} = req.params;

    const index = users.findIndex((user) => user.id === +userId);
    if (index === -1) {
        return res.status(400).json(`User with id ${userId} not found`);
    }

    users.splice(index, 1);

    res.sendStatus(204);
});

// GET ONE
app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;

    const index = users.findIndex((user) => user.id === +userId);
    if (index === -1) {
        return res.status(400).json(`User with id ${userId} not found`);
    }

    res.json(users[index]);
}); // All req with params and the similar paths should be in the end if they have the same method


app.listen(5000, () => {
    console.log('Server listen 5000')
}); // Terminal: Start command - node app; Stop - CTRL C