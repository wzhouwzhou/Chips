let scn = require('./setchannelname');

console.log('[CPSCMD][UTILITY][setchannel] Building objects...');

scn.metadata = {
  category: require('../').category,
  description: 'Sets a channel name',
  usage: 'setchannelname "name"',
  example: 'setchannelname derp-channel',
  perm: [['global.utility.setchannel.*']],
  cusomperm: ['MANAGE_CHANNELS'],
};

console.log('[CPSCMD][UTILITY][setchannel] Build objects complete!');
module.exports = [
  [scn.name, scn],
  ['setchannelname', scn],
  ['scn', scn],
];
