const _ = require('lodash');

module.exports = {
  name: 'oof',
<<<<<<< HEAD
  func(msg, { send, channel }) {
    send(`O${[...new Array(_.random(2, 7))]
=======
  func(msg, { send }) {
    return send(`O${[...new Array(_.random(2, 7))]
>>>>>>> parent of 1798b875... MASSIVE UPDATE || 25 COMMANDS HAVE .startTYPING! || FIXED TYPOS! || MADE SOME COMMANDS!! ||
      .map(() => _.sample(['o', 'O'])).join``}${[...new Array(_.random(4, 8))]
      .map(() => _.sample(['f', 'F'])).join``}${[...new Array(_.random(1, 9))]
      .map(() => _.sample(['!', '1'])).join``}!`);
  },
};
