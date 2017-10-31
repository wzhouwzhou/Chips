let fakeban = require('./-ban');

console.log('[CPSCMD][FUN][fakeban] Building objects...');

fakeban.metadata = {
  category: require('../').category,
  description: 'This command fake bans someone!',
  usage: '-ban <user> <reason>',
  example: '-ban @周珺 • WillyZ#6686 Letting Chips be eaten',
  perm: [['global.fun.-ban.-ban']],
  customperm: ['BAN_MEMBERS'],
};

console.log('[CPSCMD][FUN][fakeban] Build objects complete!');
module.exports = [
  [fakeban.name, fakeban],
];
