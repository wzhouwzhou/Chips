const Constants = require("./Constants");
const path = require("path");
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const express = require('express');
const app = express();
const Strategy = require('./lib').Strategy;
const session = require('express-session');
const flash=require("connect-flash");
const sinbad = require(path.join(__dirname, '../routes/sinbad'));
const login = require(path.join(__dirname, '../routes/login'));
const vy = require(path.join(__dirname, '../routes/vy'));
const xena = require(path.join(__dirname, '../routes/xena'));
const errp = require(path.join(__dirname, '../routes/error'));
const updates = require(path.join(__dirname, '../routes/updates'));
const useroverview = require(path.join(__dirname, '../routes/updates'));
const index = require(path.join(__dirname, '../routes/index'));
const cmds = require(path.join(__dirname,'../routes/commands'));
const morgan = require('morgan');
const morgan2 = require('morgan');
const rfs = require('rotating-file-stream');
// const chips ;
module.exports = function() {
  let botScopes = ['identify', 'guilds'];
  let logDirectory = path.join(__dirname, 'log');
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
  let accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
  });

  app.engine(Constants.express.ENGINE, require("express-ejs-extend"));
  app.set('view engine', Constants.express.ENGINE);
  console.log(__dirname);
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(flash());
  app.use(morgan('combined'));
  app.use(morgan2('combined', {stream: accessLogStream}));
  app.use((req, res, next) =>{
    let ip_address = (req.connection.remoteAddress ? req.connection.remoteAddress : req.remoteAddress);
		if (typeof req.headers['cf-connecting-ip'] === 'undefined')
		{
			console.log('[EJS][IP]: '+ ip_address);
		}
		else
		{
			console.log('[EJS][IP] (behind cloudflare): '+ req.headers['cf-connecting-ip']);
		}
    next();
  });
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  if(process.env.BETA&&process.env.BETA=="true")
    passport.use(new Strategy({
        clientID: process.env.ID||'296855425255473154',
        clientSecret: process.env.SECRET||'secret',
        callbackURL: 'http://chipsbot.tk/sinbad/user/',
        scope: botScopes
    }, function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            return done(null, profile);
        });
    }));
  else
    passport.use(new Strategy({
        clientID: process.env.ID||'296855425255473154',
        clientSecret: process.env.SECRET||'secret',
        callbackURL: 'http://chipsbot.tk/sinbad/user/',
        scope: botScopes
    }, function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            return done(null, profile);
        });
    }));

  app.use(session({
      secret: process.env.SECRET||'secret',
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

  const httpProxy = require('http-proxy');
  const stdProxy = httpProxy.createProxyServer();

  app.get('/api', function(req,res){
    console.log('Redirecting api from 8080 to 8880');
    stdProxy.web(req, res, {target: 'http://localhost:8880'});
  });

  app.get('/api/*', function(req,res){
    console.log('Redirecting api/* from 8080 to 8880');
    stdProxy.web(req, res, {target: 'http://localhost:8880'});
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
      next();
    }
  );

  app.use('/sinbad', sinbad, userBruteforce.prevent);
  app.post('/sinbad', globalBruteforce.prevent, userBruteforce.getMiddleware({
    key: function(req, res, next) {
      next();
    }
    }),function (req, res, next) {
      res.flash('Load Success!');
      next();
    }
  );

  app.use('/sinbad/login',login);
  app.use('/commands',cmds);
  app.use('/vy',vy);
  app.use('/xen*',xena);
  //app.use('/updates',updates);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = {};//req.app.get('env') === 'development' ? err : {};

    // render the error page
    if (!err.status || err.status == 500) console.error("Internal error: " + err);
    next(err);
  });
  app.use('/errr',errp);
  app.use('/*',errp);

  app.set('port', (process.env.PORT || 5000));

  app.listen(app.get('port'), process.env.MYIP||'127.0.0.1', function() {
    console.log('Node app is running on port', app.get('port'));
  });

  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  return app;
};
