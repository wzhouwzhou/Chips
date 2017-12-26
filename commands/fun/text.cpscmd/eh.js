const _ = require('lodash');

module.exports = {
  name: 'eh',
  func(msg, { send }) {
<<<<<<< HEAD
    send(`${_.sample(['E', 'e'])}${[...new Array(_.random(1, 6))]
=======
    return send(`${_.sample(['E', 'e'])}${[...new Array(_.random(1, 6))]
>>>>>>> parent of 1798b875... MASSIVE UPDATE || 25 COMMANDS HAVE .startTYPING! || FIXED TYPOS! || MADE SOME COMMANDS!! ||
      .map(() => _.sample(['h', 'H'])).join``}${_.shuffle(['!', '?']).join``}`);
  },
};
