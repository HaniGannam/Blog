var createError = require('http-errors');
var express = require('express');
const rateLimit = require('express-rate-limit');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { createRoutesNoAuth } = require("./app.routes");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // Max requests allowed within the windowMs
  message: 'Too many requests from this IP, please try again later.',
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(limiter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
createRoutesNoAuth(app)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
