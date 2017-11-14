const math = require('nodecpp-test');
const splitter = (/(\s|,)+/);

module.exports = {
  name: '-math',
  func(msg, { suffix, args, send }) {
    if (!suffix.substring(suffix.indexOf(args[0])).match(/^\d*(,|\.)?\d+$/)) {
      return send('Numbers/Comma\'s?');
    }

    if (args[0].match(/add|plus/)) {
      suffix.split(splitter);
      return send(`${math.add(splitter)}`);
    }

    if (args[0] === 'round') {
      let round = args[1];
      return send(`${math.round(round)}`);
    }

    if (args[0].match(/min|minimum|low|lowest/)) {
      return send(`${math.min(suffix.split(splitter))}`);
    }

    if (args[0].match(/highest|high|maximum|max/)) {
      suffix.split(splitter);
      return send(`${math.max(splitter)}`);
    }

    if (args[0].match(/pi|mathpi/)) return send(`${math.PI}`);

    if (args[0].match(/sr|square|root|squareroot|sqrt|rt/)) {
      let root = args[1];
      return send(`${math.sqrt(root)}`);
    }

    return send('Invalid operation');
  },
};
