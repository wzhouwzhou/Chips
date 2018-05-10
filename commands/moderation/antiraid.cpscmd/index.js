let vs = require('./-vs');

console.log('[CPSCMD][MODERATION][mutes] Building objects...');
vs.metadata = {
  category: require('../').category,
  description: 'This command lets you verify server members, however, a verification system must be setup beforehand!',
  usage: '-vs ok',
  example: '-vs ok',
  perm: [['global.moderation.antiraid.-vs']],
  customperm: ['BAN_MEMBERS'],
};

console.log('[CPSCMD][MODERATION][mutes] Build objects complete!');
module.exports = [
  [vs.name, vs],
  ['verify', vs],
  ['verification', vs],
];
