let userid = require('./userid');

console.log('[CPSCMD][INFO][userid] Building objects...');
userid.metadata = {
  category: require('../').category,
  description: "Gives you someone's id!",
  usage: 'userid <mention>',
  example: 'userid @James#0001',
  perm: [['public.info.userid']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][userid] Build objects complete!');
module.exports = [
  [userid.name, userid],
  ['uid', userid],
];
