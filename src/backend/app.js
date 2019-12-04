let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let FileStore = require('session-file-store');

let indexRouter = require('./routes/index');
let itemsRouter = require('./routes/items');
let reviewsRouter = require('./routes/reviews');
let usersRouter = require('./routes/users');
let loginRouter = require('./routes/login');
let logoutRouter = require('./routes/logout');
let signupRouter = require('./routes/signup');

let similarItemFInder = require('./modules/similar_item_finder');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session initialize
app.use(session({
  secret: "123SESSIONKEY456",
  resave: false,
  saveUninitialized: false,
}));

//firebase
let firebase = require('firebase');
let firebaseConfig = require('./firebaseConfig.json');

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
let firestore = firebase.firestore();

//find similar items in interval
let interval = (1000*60*60) * 12 // (1000*60*60) = 1 hour 
// similarItemFInder() //not used until test
setInterval(similarItemFInder, interval);
//router
app.use('/', indexRouter);
app.use('/api/items', itemsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/signup', signupRouter);

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
