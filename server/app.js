var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var config = require('./config');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var exercisesRouter = require('./routes/api/exercises');
var trainingsRouter = require('./routes/api/trainings');
var trainingHistoryRouter = require('./routes/api/trainingHistory');
var oneExercisesRouter = require('./routes/api/oneExercises');
var weightsRouter = require('./routes/api/weights');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cors());

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
app.use('/exercises', exercisesRouter);
app.use('/trainings', trainingsRouter);
app.use('/trainingHistory', trainingHistoryRouter);
app.use('/oneExercises', oneExercisesRouter);
app.use('/weights', weightsRouter);


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
  res.render('error', {title: 'Error'});
});

const mongoose = require("mongoose");

async function main() {
  await mongoose.set('strictQuery', false);
  await mongoose.connect(config.db.path);
}

main().catch(console.log);


app.listen(3001, () => {
  console.log(`3001`)
})

module.exports = app;
