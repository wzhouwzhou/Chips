const _ = require('lodash');

module.exports = {
  name: 'mock',
  func(msg, { suffix, send }) {
    return send(suffix.replace(/(?:\w)(\w+)?/g, (...m) => `k${_.drop(m)[0] || ''}`)
      .replace(/c/gi, 'k') || 'Nothing provided to bify', { disableEveryone: true });
  },
};
