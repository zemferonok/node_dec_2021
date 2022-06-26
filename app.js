const express = require('express');
const mongoose = require('mongoose');

const {userRouter, authRouter} = require('./routes');
const {configs} = require('./configs');

mongoose.connect(configs.MONGO_URL);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use('*', (req, res) => res.status(404).json('Page not found'));

app.use((err, req, res, next) => {
    console.log('##############################')
    console.log('ERROR in app.js', err?.message)
    console.log('##############################')
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