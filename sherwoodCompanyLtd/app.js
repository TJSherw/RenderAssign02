var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// import authentication
const passport = require('passport');
const session = require('express-session');

const User = require('./models/user');

var githubStrategy = require('passport-github2').Strategy;

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

//export lib 
var config = require('./config/global')
var mongoose = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// config pass/sess
app.use(session(
  {
    secret: "scl",
    resave: false,
    saveUninitialized: false
  }
));

app.use(passport.initialize());
app.use(passport.session());


passport.use(User.createStrategy());

//git

passport.use(new githubStrategy({
  clientID: config.github.clientId,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackURL
},
async (accessToken, refreshToken, profile, done) => {
  const user = await User.findOne({ ouathId: profile.id});
  if(user){
    return done(null,user);
  } else {
    const newUser = new User ({
      username: profile.username,
      ouathId: profile.id,
      ouathProvider: 'GitHub',
      created: Date.now()
    });
    const savedUser = await newUser.save();
    return done(null, savedUser);
  }
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//router
app.use('/', indexRouter);
// app.use('/users', usersRouter);

// config mongoose
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true}) // connect to
.then((message)=>{
  console.log('Connect Success');
}) // after
.catch((err)=>{
  console.log('Error while connecting' + err);
}); // catch


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
