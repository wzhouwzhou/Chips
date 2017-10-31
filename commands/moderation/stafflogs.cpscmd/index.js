let sl = require('./stafflogs');

console.log('[CPSCMD][MODERATION][botnic] Building objects...');
sl.metadata = {
  category: require('../').category,
  description: 'This changes the bot nickname.',
  usage: 'stafflogs set',
  example: 'stafflogs-set',
  perm: [['global.info.info']],
  customperm: ['MANAGE_CHANNELS'],
};


console.log('[CPSCMD][MODERATION][botnick] Build objects complete!');
module.exports = [
  [sl.name, sl],
  ['stafflogs', sl],
];
