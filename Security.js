require('connect-flash');
module.exports = function(req, res, next) {
  let ExpressBrute = require('express-brute'),
    moment = require('moment'),
    store;
  store = new ExpressBrute.MemoryStore();
  let failCallback = function(req, res, next, nextValidRequestDate) {
    req.flash('error', `You've made too many failed attempts in a short period of time, please try again ${moment(nextValidRequestDate).fromNow()}`);
    res.redirect('http://1.bp.blogspot.com/--q7bs-l5-6g/VXSx8wf6IVI/AAAAAAAAGxw/-9cy3VNvVZo/s1600/ya%2Bdone%2Bgoofed.jpg'); // Brute force protection triggered, send them back to the login page
  };
  const handleStoreError = error => {
    log.error(error); // Log this error so we can figure out what went wrong
    // cause node to exit, hopefully restarting the process fixes the problem
    throw {
      message: error.message,
      parent: error.parent,
    };
  };

  let userBruteforce = new ExpressBrute(store, {
    freeRetries: 5,
    minWait: 5 * 60 * 1000, // 5 minutes
    maxWait: 60 * 60 * 1000, // 1 hour,
    failCallback: failCallback,
    handleStoreError: handleStoreError,
  });

  let globalBruteforce = new ExpressBrute(store, {
    freeRetries: 1000,
    attachResetToRequest: false,
    refreshTimeoutOnRequest: false,
    minWait: 25 * 60 * 60 * 1000, // 1 day 1 hour (should never reach this wait time)
    maxWait: 25 * 60 * 60 * 1000, // 1 day 1 hour (should never reach this wait time)
    lifetime: 24 * 60 * 60, // 1 day (seconds not milliseconds)
    failCallback: failCallback,
    handleStoreError: handleStoreError,
  });


  return [globalBruteforce, userBruteforce];
};
