let scn = require('./setchannelname');

console.log('[CPSCMD][INFO][roles] Building objects...');

scn.metadata = {
  category: require('../').category,
  description: 'Lists all roles of a guild.',
  usage: 'setchannelname "name"',
  example: 'setchannelname derp-channel',
  perm: [['global.info.info']],
  customperm: ['MANAGE_CHANNELS'],
};

console.log('[CPSCMD][INFO][roles] Build objects complete!');
module.exports = [
  [scn.name, scn],
  ['setchannelname', scn],
  ['scn', scn],
];
