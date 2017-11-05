let ch = require('./channels');

console.log('[CPSCMD][INFO][channels] Building objechs...');
ch.metadata = {
  category: require('../').category,
  description: 'This shows all the channels in the server!',
  usage: 'channels',
  example: 'channels',
  perm: [['global.info.channels']],
};


console.log('[CPSCMD][INFO][channels] Build objechs complete!');
module.exports = [
  [ch.name, ch],
  ['channeltopic', ch],
  ['ch', ch],
];  