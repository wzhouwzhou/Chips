const _ = require('lodash');

module.exports = {
  name: 'nerd',
  func(msg, { send, args }) {
    if (args[0].match(/^[^]*<@!?(\d+)>[^]*$/)) {
      let targetUser = msg.mentions.members.first();
      send(`${targetUser + []} is a N${[...new Array(_.random(2, 7))]
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
  },
};
