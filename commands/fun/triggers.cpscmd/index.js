
let aboose = require('./aboose');
let confoosed = require('./confoosed');
let exposed = require('./exposed');
let lenny = require('./lenny');
let rekt = require('./rekt');

console.log('[CPSCMD][FUN][triggers] Building objects...');
aboose.metadata = {
  category: require('../').category,
  description: 'Aboose!',
  usage: 'aboose',
  example: 'aboose',
  perm: [['global.fun.triggers.aboose']],
};
confoosed.metadata = {
  category: require('../').category,
  description: 'Confoosed!',
  usage: 'confoosed',
  example: 'confoosed',
  perm: [['global.fun.triggers.confoosed']],
};
exposed.metadata = {
  category: require('../').category,
  description: 'Exposed!',
  usage: 'exposed',
  example: 'exposed',
  perm: [['global.fun.triggers.exposed']],
};
lenny.metadata = {
  category: require('../').category,
  description: 'Lenny!',
  usage: 'lenny',
  example: 'lenny',
  perm: [['global.fun.triggers.lenny']]
};
rekt.metadata = {
  category: require('../').category,
  description: 'Rekt!',
  usage: 'rekt',
  example: 'rekt',
  perm: [['global.fun.triggers.rekt']],
};

console.log('[CPSCMD][FUN][triggers] Build objects complete!');
module.exports = [
  [aboose.name,aboose],
  [confoosed.name,confoosed],
  [exposed.name,exposed],
  [lenny.name,lenny],
  [rekt.name,rekt],
];
