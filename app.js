const express = require('express');
const app = express();
require('dotenv/config');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authJwt = require('./auth/jwt');
const errorHandler = require('./auth/errorHandler');

app.use(cors());
// http request
app.options('*', cors());

// for indentify post request json file format (Middleware)
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

const api = process.env.API_URL;

// import routes
const userRouter = require('./routes/users');
const studentRouter = require('./routes/students');


// set api routers
app.use(`${api}/user`, userRouter);
app.use(`${api}/student`, studentRouter);


// connect db
mongoose.connect(process.env.CONNECTION_STRING, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    dbName: process.env.DB_NAME
})
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Server is running !');
        })
        console.log('Database connection is ready......');
    })
    .catch((err) => {
        console.log(err);
    })