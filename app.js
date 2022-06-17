const express = require('express');

const userRouter = require('./routes/user.router');
const constants = require('./configs/constants');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('*', (req, res) => res.status(404).json('Page not found'));

app.listen(constants.PORT, () => {
    console.log('Server listen 5000 ', new Date())
});