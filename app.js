var express = require('express');
var app = express();

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var path = require('path');
var port = process.env.PORT || '3000';
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
require('dotenv').config();

app.set('view-engine' , 'jade');
app.use(express.static(path.join(__dirname, 'views/styles')));
app.use(express.static(path.join(__dirname, 'public/scripts')));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// required for passport
app.use(session({secret: process.env.SESSION_SECRET})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./controllers/auth')(app, passport);
require('./controllers/passport')(passport);

var userRouter = express.Router();
app.use('/user', userRouter)
require('./controllers/userRoutes')(userRouter);

app.get('/', function(req,res){
  res.render('index.jade', {currentUser : req.user});
});


mongoose.connect(process.env.MONGO_URL, function(err){
    if(err){
      throw err;
    }
    console.log('Connected to middleground database.');
});

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}

app.listen(port);
