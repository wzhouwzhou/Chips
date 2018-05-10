let vs = require('./-vs');
let uv = require('./uv');

console.log('[CPSCMD][MODERATION][mutes] Building objects...');
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
  usage: '-uv <user>',
  example: '-vs <user>',
  perm: [['global.moderation.antiraid.-vs']],
  customperm: ['MANAGE_ROLES'],
};

console.log('[CPSCMD][MODERATION][mutes] Build objects complete!');
module.exports = [
  [vs.name, vs],
  ['verify', vs],
  ['verification', vs],
  [uv.name, uv],
  ['unverify', uv],
];
