
let ms = require('./memberstatus');
let cms = require('./channelmemberstatus') ;
console.log('[CPSCMD][INFO][memberstatus] Building objects...');

ms.metadata = {
  category: require('../').category,
  description: 'Fetches the amount of online, idle, offline or dnd people.',
  usage: 'memberstatus <no args> / idle / online / invis / dnd',
  example: 'memberstatus',
  perm: [['global.info.info.memberstatus']],
  customperm: ['SEND_MESSAGES'],
};
cms.metadata = {
  category: require('../').category,
  description: 'Fetches the amount of online, idle, offline or dnd people.',
  usage: 'channelmemberstatus <no args> / idle / online / invis / dnd',
  example: 'channelmemberstatus',
  perm: [['global.info.info.channelmemberstatus']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][memberstatus] Build objects complete!');
module.exports = [
  [ms.name,ms],
  ['ms', ms],
  ['memberstatuses', ms],
  [cms.name, cms],
  ['cms', cms],
  ['channelmemberstatuses', cms],
];
