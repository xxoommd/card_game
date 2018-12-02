const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// require('./mysql').connect()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gameRouter = require('./routes/game')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/game', gameRouter)

module.exports = app;
