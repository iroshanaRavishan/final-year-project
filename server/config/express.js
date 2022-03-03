const express = require('express');
const path = require('path');
const config = require('./config');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('../routes');
const passport = require('../middleware/passport');
const HttpError = require('http-errors');

/* THE MIDDLEWARES */

//init the app 
const app = express();

//logger
if(config.env === 'development') {
    app.use(logger('dev'));
}

//get the dist folder 
const distDir = path.join(__dirname, '../../dist');

//use dist folder as hosting folder by express
app.use(express.static(distDir));

app.use('/images', express.static(path.join('images')));

//parsing from api
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//secure apps http
app.use(helmet());

//allow cors
app.use(cors());

//authenticate
app.use(passport.initialize());

//api router //localhost:4050/api
app.use('/api/', routes);

// serve the index.html
app.use('*', (req, res) => res.sendFile(path.join(distDir, 'index.html')));

// catch the 404 error and forward to the error handler
app.use((req, res, next) => {
    const error = new HttpError(404);
    return next(error);
});

//error handler, stack trace
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    });
    next(err);
});

module.exports = app;
