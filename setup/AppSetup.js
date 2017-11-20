const Constants = require('./Constants');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const express = require('express');
const app = express();
const Strategy = require('./lib').Strategy;
const session = require('express-session');
const flash = require('connect-flash');
const sinbad = require(path.join(__dirname, '../routes/sinbad'));
const login = require(path.join(__dirname, '../routes/login'));
const vy = require(path.join(__dirname, '../routes/vy'));
const xena = require(path.join(__dirname, '../routes/xena'));
const errp = require(path.join(__dirname, '../routes/error'));
const updates = require(path.join(__dirname, '../routes/updates'));
const useroverview = require(path.join(__dirname, '../routes/updates'));
const index = require(path.join(__dirname, '../routes/index'));
const cmds = require(path.join(__dirname, '../routes/commands'));
const morgan = require('morgan');
const morgan2 = require('morgan');
const rfs = require('rotating-file-stream');

const https = require('https');

const ssloptions = {
  key: fs.readFileSync(path.join(__dirname, './key.pem')),
  cert: fs.readFileSync(path.join(__dirname, './cert.pem')),
};


module.exports = () => {
  let botScopes = ['identify', 'guilds'];
  let logDirectory = path.join(__dirname, 'log');
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
  let accessLogStream = rfs('access.log', {
    interval: '1d',
    path: logDirectory,
  });

  app.engine(Constants.express.ENGINE, require('express-ejs-extend'));
  app.set('view engine', Constants.express.ENGINE);

  app.use(express.static(path.join(__dirname, '../public')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(flash());
  app.use(morgan('combined'));
  app.use(morgan2('combined', { stream: accessLogStream }));
  app.use((req, res, next) => {
    let ip_address = req.connection.remoteAddress ? req.connection.remoteAddress : req.remoteAddress;
    if (typeof req.headers['cf-connecting-ip'] === 'undefined') {
      console.log(`[EJS][IP]: ${ip_address}`);
    } else {
      console.log(`[EJS][IP] (behind cloudflare): ${req.headers['cf-connecting-ip']}\n\tCountry: ${req.headers['cf-ipcountry']}`);
    }
    next();
  });
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  if (process.env.BETA && process.env.BETA == 'true') {
    passport.use(new Strategy({
      clientID: process.env.ID || '296855425255473154',
      clientSecret: process.env.SECRET || 'secret',
      callbackURL: 'http://chipsbot.tk/sinbad/user/',
      scope: botScopes,
    }, (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => done(null, profile));
    }));
  } else {
    passport.use(new Strategy({
      clientID: process.env.ID || '296855425255473154',
      clientSecret: process.env.SECRET || 'secret',
      callbackURL: 'http://chipsbot.tk/sinbad/user/',
      scope: botScopes,
    }, (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => done(null, profile));
    }));
  }

  app.use(session({
    secret: process.env.SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.post('mail', (request, res) => {
    console.log(`Incoming /mail post:\n\t${request.body}`);
    // Res.json({ message: 'success' });
  });
  app.get('/sinbad/login', passport.authenticate('discord', { scope: botScopes }), _ => _);
  app.get('/sinbad/user',
    passport.authenticate('discord', { failureRedirect: '/sinbad' }), (req, res) => {
      // If (req.query.hasOwnProperty('guild_id'))
      res.redirect('/updates');
    }
    // Auth success
  );
  app.get('/sinbad/logout', (req, res) => {
    req.logout();
    res.redirect('/sinbad');
  });

  const httpProxy = require('http-proxy');
  const stdProxy = httpProxy.createProxyServer();

  app.get('/api', (req, res) => {
    console.log('Redirecting api from 8080 to 8880');
    stdProxy.web(req, res, { target: 'http://localhost:8880' });
  });

  app.get('/api/*', (req, res) => {
    console.log('Redirecting api/* from 8080 to 8880');
    stdProxy.web(req, res, { target: 'http://localhost:8880' });
  });
  // Routes
  const secure = require(path.join(__dirname, '../Security'));
  let globalBruteforce = new secure()[0];
  let userBruteforce = new secure()[1];

  app.use('/', index, userBruteforce.prevent);
  app.post('/', globalBruteforce.prevent, userBruteforce.getMiddleware({
    key: (req, res, next) => {
      next();
    },
  }), (req, res, next) => {
    res.flash('Load Success!');
    next();
  }
  );

  app.use('/sinbad', sinbad, userBruteforce.prevent);
  app.post('/sinbad', globalBruteforce.prevent, userBruteforce.getMiddleware({
    key: (req, res, next) => {
      next();
    },
  }), (req, res, next) => {
    res.flash('Load Success!');
    next();
  }
  );

  app.use('/sinbad/login', login);
  app.use('/commands', cmds);
  app.use('/vy', vy);
  app.use('/xen*', xena);
  app.use('/errr', errp);
  // App.use('/updates',updates);

  // error handler
  app.use((req, res) => {
    let err = { error: 'Not found' };
    // New Error('Not Found');
    err.status = 404;
    res.locals.message = err.message;
    res.locals.error = {};
    // Req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    if (!err.status || err.status === 500) console.error(`Internal error: ${err}`);
    res.render('error', { type: err.status || 500, timestamp: new Date().toString() });
  });

  app.use('/*', errp);

  app.set('port', process.env.PORT || 5000);

  https.createServer(ssloptions, app).listen(app.get('port'), process.env.MYIP || '127.0.0.1', () => {
    console.log('Node app is running on port', app.get('port'));
  });

  // App.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  return app;
};
