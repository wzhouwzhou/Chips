const _ = require('lodash');

module.exports = {
  name: 'nerd',
<<<<<<< HEAD
  func(msg, { send, args, channel }) {
    if (args[0].match(/^[^]*<@!?(\d+)>[^]*$/)) {
      let targetUser = msg.mentions.members.first();
      send(`${targetUser + []}  N${[...new Array(_.random(2, 7))]
        .map(() => _.sample(['e', 'E'])).join``}${[...new Array(_.random(1, 3))]
        .map(() => _.sample(['r', 'R'])).join``}${[...new Array(_.random(1, 4))]
        .map(() => _.sample(['d', 'D'])).join``}!${[...new Array(_.random(1, 2))]
        .map(() => _.sample(['!', '1'])).join``}!`);
    } else {
      send(`N${[...new Array(_.random(2, 7))]
        .map(() => _.sample(['e', 'E'])).join``}${[...new Array(_.random(1, 3))]
        .map(() => _.sample(['r', 'R'])).join``}${[...new Array(_.random(1, 4))]
        .map(() => _.sample(['d', 'D'])).join``}!${[...new Array(_.random(1, 2))]
        .map(() => _.sample(['!', '1'])).join``}!`);
    }
=======
  func(msg, { send }) {
    return send(`N${[...new Array(_.random(2, 7))]
      .map(() => _.sample(['e', 'E'])).join``}${[...new Array(_.random(1, 3))]
      .map(() => _.sample(['r', 'R'])).join``}${[...new Array(_.random(1, 4))]
      .map(() => _.sample(['d', 'D'])).join``}!${[...new Array(_.random(1, 2))]
      .map(() => _.sample(['!', '1'])).join``}!`);
>>>>>>> parent of 1798b875... MASSIVE UPDATE || 25 COMMANDS HAVE .startTYPING! || FIXED TYPOS! || MADE SOME COMMANDS!! ||
  },
};
