var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var Datastore = require("nedb");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var blogRouter = require("./routes/blog");
const {
  caesarCipherEncrypt,
  caesarCipherDecrypt,
} = require("./utils/ceasar-cipher");

var app = express();

db = {};
db.admins = new Datastore({
  filename: "database/admins.datafile",
  autoload: true,
  afterSerialization: function (data) {
    return caesarCipherEncrypt(data, 7);
  },
  beforeDeserialization: function (data) {
    return caesarCipherDecrypt(data, 7);
  },
});
db.blogItems = new Datastore({
  filename: "database/blogitems.datafile",
  autoload: true,
  afterSerialization: function (data) {
    return caesarCipherEncrypt(data, 7);
  },
  beforeDeserialization: function (data) {
    return caesarCipherDecrypt(data, 7);
  },
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use("/blog", blogRouter);

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
