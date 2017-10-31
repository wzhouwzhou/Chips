let ping = require('./ping');

console.log('[CPSCMD][INFO][ping] Building objects...');

ping.metadata = {
  category: require('../').category,
  description: 'Gives ping for various actions with chips, and also rates a weighted average!',
  usage: 'ping <no args>',
  example: 'ping',
  perm: [['global.info.ping.ping']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][ping] Build objects complete!');
module.exports = [
  [ping.name, ping],
];
