require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressFileUpload = require('express-fileupload');

const userRouter = require('./routes/user.router');
const configs = require('./configs/configs');

// If DB doesn't exist, it will be created.
mongoose.connect(configs.MONGO_URL);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(expressFileUpload());

app.use('/users', userRouter);

app.use('*', (req, res) => res.status(404).json('Page not found'));

// Catch error from deeper level
app.use((err, req, res, next) => {
    res
        .status(err?.status || 500)
        .json({
            error: err?.message || 'Unknown Error',
            code: err?.status || 500
        });
});

app.listen(configs.PORT, () => {
    console.log(`Server listen ${configs.PORT}`, new Date())
});