
let ms = require('./memberstatus');

console.log('[CPSCMD][INFO][ping] Building objects...');

ms.metadata = {
  category: require('../').category,
  description: 'Fetches the amount of online, idle, offline or dnd people.',
  usage: 'memberstatus <no args> / idle / online / invis / dnd',
  example: 'memberstatus',
  perm: [['global.info.info']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][ping] Build objects complete!');
module.exports = [
  [ms.name,ms],
  ['ms', ms],
  ['memberstatus', ms],
];
