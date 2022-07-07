require('dotenv').config();
const express = require('express');

const {config} = require('./constants');
const {apiRouter} = require('./routers');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/sendMail', apiRouter);

app.use('*', (req, res) => res.status(404).json('Page not found'));

app.use((err, req, res, next) => {
    console.log('############################');
    console.log(err);
    console.log('############################');
    res
        .status(err?.status || 500)
        .json({
            message: err?.message,
            data: err?.data
        })
})


app.listen(config.PORT, () => {
    console.log(`Serves has started on PORT: ${config.PORT}`, new Date());
});