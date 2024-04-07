var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var compositoresRouter = require('./routes/compositores');
var periodosRouter = require('./routes/periodos');

var app = express();
var mongoose = require("mongoose")

var mongoDB = 'mongodb://127.0.0.1/TPC6'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
var db = mongoose.connection
db.on('error', console.error.bind(console, 'Errode conexão ao mongodb'))
db.once('open' , () => {
  console.log("Conexão ao mongodb realizada com sucesso")
})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', compositoresRouter);
app.use('/', periodosRouter)
//app.use('/users', usersRouter);

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
  res.jsonp(JSON.stringify(err));
});

module.exports = app;
