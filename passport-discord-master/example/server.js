var express  = require('express')
  , session  = require('express-session')
  , passport = require('passport')
  , Strategy = require('../lib').Strategy
  , app      = express();

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var scopes = ['identify', 'guilds'];

passport.use(new Strategy({
    clientID: process.env.ID,
    clientSecret: process.env.SECRET,
    callbackURL: 'https://chipsbot.herokuapp.com/user',
    scope: scopes
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile);
    });
}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/login', passport.authenticate('discord', { scope: scopes }), function(req, res) {});
app.get('/user',
    passport.authenticate('discord', { failureRedirect: '/loginfailed' }), function(req, res) {
      if (req.query.hasOwnProperty('guild_id'))
        res.redirect('/user');
    } // auth success
);
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
app.get('/user', checkAuth, function(req, res) {
    //console.log(req.user)
    res.json(req.user);
});


function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.send('not logged in :(');
}


app.listen(51002, function (err) {
    if (err) return console.log(err);
    console.log('Listening at port 51002');
});
