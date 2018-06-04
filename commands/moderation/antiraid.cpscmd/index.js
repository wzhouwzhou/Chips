let vs = require('./-vs');
let uv = require('./uv');

console.log('[CPSCMD][MODERATION][antiraid] Building objects...');
vs.metadata = {
  category: require('../').category,
  description: 'This command lets you verify server members, however, a verification system must be setup beforehand!',
  usage: '-vs ok',
  example: '-vs ok',
  perm: [['global.moderation.antiraid.-vs']],
  customperm: ['BAN_MEMBERS'],
};

uv.metadata = {
  category: require('../').category,
  description: 'This command lets you unverify server members, however, a verification system must be setup beforehand!',
  usage: '-uv',
  example: '-vs',
  perm: [['global.moderation.antiraid.-vs']],
  customperm: ['BAN_MEMBERS'],
};

console.log('[CPSCMD][MODERATION][antiraid] Build objects complete!');
module.exports = [
  [vs.name, vs],
  ['vs', vs],
  ['verify', vs],
  ['verification', vs],
  [uv.name, uv],
  ['uv', uv],
  ['-uv', uv],
];
