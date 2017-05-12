/**
 * Module dependencies.
 */
var Loader = require('./DatabaseLoader');

/**
 * Expose `Loader` directly from package.
 */
exports = module.exports = Loader;

/**
 * Export stuff
 */
exports = { DatabaseLoader: Loader,
  sheets: Loader.sheets,
  blacklist: Loader.blacklist,
  ready: Loader.ready,
  sinxUsers: Loader.sinxUsers };
