const { math } = require('nodecpp-test');
const splitter = (/(\s|,)+/);
const _ = require('lodash');
module.exports = {
  name: '-math',
  func(msg, { suffix, args, send }) {
    if (!_.drop(suffix.split(/\s+/))[0].match(/^\d*(,|\.)?\d+$/)) {
      return send('Numbers/Comma\'s?');
    }

    if (args[0].match(/add|plus/)) {
      return send(`${math.add(...suffix.split(splitter).map(e => +e))}`);
    }

    if (args[0] === 'round') {
      let round = args[1];
      return send(`${math.round(+round)}`);
    }

    if (args[0].match(/min|minimum|low|lowest/)) {
      return send(`${Math.min(suffix.split(splitter))}`);
    }

    if (args[0].match(/highest|high|maximum|max/)) {
      suffix.split(splitter);
      return send(`${Math.max(splitter)}`);
    }

    if (args[0].match(/pi|mathpi/)) return send(`${Math.PI}`);

    if (args[0].match(/sr|square|root|squareroot|sqrt|rt/)) {
      let root = args[1];
      return send(`${Math.sqrt(root)}`);
    }

    return send('Invalid operation');
  },
};
