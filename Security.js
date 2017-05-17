require('connect-flash');
module.exports = function(req, res, next) {
  let ExpressBrute = require('express-brute'),
     moment = require('moment'),
     store;
  store = new ExpressBrute.MemoryStore();
  var failCallback = function(req, res, next, nextValidRequestDate) {
    req.flash('error', "You've made too many failed attempts in a short period of time, please try again " + moment(nextValidRequestDate).fromNow());
    res.redirect('/'); // brute force protection triggered, send them back to the login page
  };
  const handleStoreError = (error) => {
    log.error(error); // log this error so we can figure out what went wrong
    // cause node to exit, hopefully restarting the process fixes the problem
    throw {
      message: error.message,
      parent: error.parent
    };
  };
  // No more than 1000 login attempts per day per IP
  var globalBruteforce = new ExpressBrute(store, {
    freeRetries: 5,
    attachResetToRequest: false,
    refreshTimeoutOnRequest: false,
    minWait: 25 * 60 * 60 * 1000, // 1 day 1 hour (should never reach this wait time)
    maxWait: 25 * 60 * 60 * 1000, // 1 day 1 hour (should never reach this wait time)
    lifetime: 24 * 60 * 60, // 1 day (seconds not milliseconds)
    failCallback: failCallback,
    handleStoreError: handleStoreError
  });

  return globalBruteforce;
};
