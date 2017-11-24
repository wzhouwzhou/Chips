let userid = require('./userid');

console.log('[CPSCMD][INFO][userid] Building objects...');
userid.metadata = {
  category: require('../').category,
  description: "Links Chips' userid server!",
  usage: 'userid',
  example: 'userid',
  perm: [['public.info.userid']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][userid] Build objects complete!');
module.exports = [
  [userid.name, userid],
  ['uid', userid],
];
