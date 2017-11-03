let scn = require('./setchannelname');

console.log('[CPSCMD][MODERATION][setchannelname] Building objects...');

scn.metadata = {
  category: require('../').category,
  description: 'Lists all roles of a guild.',
  usage: 'setchannelname "name"',
  example: 'setchannelname derp-channel',
  perm: [['global.moderation.setchannel.name']],
  cusomperm: ['MANAGE_CHANNELS'],
};

console.log('[CPSCMD][MODERATION][setchannelname] Build objects complete!');
module.exports = [
  [scn.name, scn],
  ['setchannelname', scn],
  ['scn', scn],
];
