const _ = require('lodash');

module.exports = {
  name: 'bify',
  func(msg, { suffix, send }) {
    return send(suffix.replace(/(?:\w)(\w+)?/g, (...m) => `🅱${_.drop(m)[0] || ''}`)
      .replace(/b/gi, '🅱') || 'Nothing provided to bify', { disableEveryone: true });
  },
};
