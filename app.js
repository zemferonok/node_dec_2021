const express = require('express');
require('dotenv').config();


const { config } = require('./constants');
const { apiRouter } = require('./routers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/sendMail', apiRouter);

app.use('*', (req, res) => res.status(404).json('Page not found'));
//
// app.use((err, req, res, next) => {
//     console.log('##############################')
//     console.log('ERROR in app.js', err?.message)
//     console.log('##############################')
//     res
//         .status(err?.status || 500)
//         .json({
//             message: err.message || 'Unknown Error',
//             data: err?.data  || 'Unknown Data',
//             code: err?.status || 500
//         })
// })


app.listen(config.PORT, async () => {
    console.log(`Serves has started on PORT: ${config.PORT}`);
    console.log(new Date.now());
});