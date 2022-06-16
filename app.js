const express = require('express');

const {users} = require('./dataBase/users')

const app = express();

app.get('/', async (req, res) => {
    const request = req;    // Request ifo from client
    res.status(200).json('Response to client..')
    //  The response must be, but it can be only one
});

// GET ALL
app.get('/users', async (req, res) => {
    res.json(users);
});

// CREATE
app.post('/users', (req, res) => {

    // const { name, age } = req.body;
    //
    // if (!Number.isInteger(age) || age > 0) {
    //     return res.status(400).json('Set valid age');
    // }
    //
    // if (!name || name.length < 3) {
    //     return res.status(400).json('Set valid name');
    // }
    //
    // const newUser = {
    //     id: users[users.length - 1].id ? users[users.length - 1].id + 1 : 1,
    //     name,
    //     age,
    // }

    console.log('params - ' + req.params)
    console.log('params - ' + req.body)
    const newUser = {
        id: users[users.length - 1].id ? users[users.length - 1].id + 1 : 1,
        name: 'Idiot-' + Math.round(Math.random() * 100),
        age: 10 + Math.round(Math.random() * 30),
    }

    users.push(newUser);

    res.status(201).json(newUser + ' was created');
});

// DELETE
// app.delete('/users/:userId', (req, res) => {
//     const { userId } = req.params;
//     console.log('UserID')
//     console.log(userId)
//
//     const index = users.findIndex((user) => user.id === +userId);
//
//     if (index === -1) {
//         return res.status(400).json(`User with id ${userId} not found`);
//     }
//
//     users.splice(index, 1);
//
//     res.sendStatus(204);
// });

// app.put('/users/:usersId', (req, res) => {
//     users.push({
//         name: 'TEST',
//         age: Math.random()*100
//     });
//
//     res.status(201).json('Users was created')
// });

// app.get('/users/:userId', (req, res) => {
//     const userIndex = +req.params.userId;
//
//     if (isNaN(userIndex) || userIndex < 0) {
//         res.status(400).json('Please enter valid ID');
//         return;
//     }
//
//     const user = users[userIndex];
//
//     if (!user) {
//         res.status(404).json(`Use with ID ${userIndex} is not found`);
//         return;
//     }
//
//     res.json(user);
// });


app.listen(5000, () => {
    console.log('Server listen 5000')
}); // Terminal: Start command - node app; Stop - CTRL C