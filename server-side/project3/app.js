var createError = require('http-errors');
var express = require('express');
const cors=require('cors');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tutorsRouter=require('./routes/tutors');
var studentsRouter=require('./routes/students');
var favouriteRouter=require('./routes/favouritelist');
var feedbackRouter=require('./routes/feedback');
var appointmentRouter=require('./routes/appointment');

var app = express();
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tutors',tutorsRouter);
app.use('/students',studentsRouter);
app.use('/favouritelist',favouriteRouter);
app.use('/feedback',feedbackRouter);
app.use('/appointment',appointmentRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
