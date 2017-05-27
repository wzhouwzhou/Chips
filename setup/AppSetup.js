const Constants = require("./Constants");
const path = require("path");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const express = require('express');
const app = express();
const Strategy = require('./lib').Strategy;
const session = require('express-session');
const flash=require("connect-flash");
const ExpressBrute = require('express-brute');
const sinbad = require(path.join(__dirname, '../routes/sinbad'));
const login = require(path.join(__dirname, '../routes/login'));
const updates = require(path.join(__dirname, '../routes/updates'));
const useroverview = require(path.join(__dirname, '../routes/updates'));
const index = require(path.join(__dirname, '../routes/index'));
// const chips ;
module.exports = function() {
  let botScopes = ['identify', 'guilds'];
  app.engine(Constants.express.ENGINE, require("express-ejs-extend"));
  app.set('view engine', Constants.express.ENGINE);
  console.log(__dirname);
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(flash());

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  if(process.env.BETA&&process.env.BETA=="true")
    passport.use(new Strategy({
        clientID: process.env.ID,
        clientSecret: process.env.SECRET,
        callbackURL: 'http://williamzhou.us.to/sinbad/user/',
        scope: botScopes
    }, function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            return done(null, profile);
        });
    }));
  else
    passport.use(new Strategy({
        clientID: process.env.ID,
        clientSecret: process.env.SECRET,
        callbackURL: 'https://chipsbot.herokuapp.com/sinbad/user/',
        scope: botScopes
    }, function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            return done(null, profile);
        });
    }));

  app.use(session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.get('/sinbad/login', passport.authenticate('discord', { scope: botScopes }), function(req, res) {});
  app.get('/sinbad/user',
      passport.authenticate('discord', { failureRedirect: '/sinbad' }), function(req, res) {
        //if (req.query.hasOwnProperty('guild_id'))
          res.redirect('/updates');
      } // auth success
  );
  app.get('/sinbad/logout', function(req, res) {
      req.logout();
      res.redirect('/sinbad');
  });
  // routes
  const secure = require(path.join(__dirname, '../Security'));
  let globalBruteforce = new secure()[0];
  let userBruteforce = new secure()[1];

  app.use('/', index, userBruteforce.prevent);
  app.post('/', globalBruteforce.prevent, userBruteforce.getMiddleware({
      key: function(req, res, next) {
          next();
      }
    }),function (req, res, next) {
        res.flash('Load Success!');
    }
  );

  app.use('/sinbad', sinbad, userBruteforce.prevent);
  app.post('/sinbad', globalBruteforce.prevent, userBruteforce.getMiddleware({
      key: function(req, res, next) {
          next();
      }
    }),function (req, res, next) {
        res.flash('Load Success!');
    }
  );

  app.use('/sinbad/login',login);
  //app.use('/updates',updates);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', { type: err.status || 500 });
    if (!err.status || err.status == 500) console.error("Internal error: " + err);
  });

  app.set('port', (process.env.PORT || 5000));

  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });

  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  return app;
};
