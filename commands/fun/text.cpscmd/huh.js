const _ = require('lodash');

module.exports = {
  name: 'huh',
<<<<<<< HEAD
  func(msg, { send, suffix }) {
    send(`${suffix && suffix.length > 0 ? suffix.replace(/$/, ',') : ''} H${[...new Array(_.random(1, 6))]
=======
  func(msg, { send }) {
    return send(`H${[...new Array(_.random(1, 6))]
>>>>>>> parent of 1798b875... MASSIVE UPDATE || 25 COMMANDS HAVE .startTYPING! || FIXED TYPOS! || MADE SOME COMMANDS!! ||
      .map(() => _.sample(['u', 'U'])).join``}${_.sample(['H', 'h'])}${_.shuffle(['!', '?']).join``}`);
  },
};
