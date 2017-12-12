/* eslint no-console: 'off' */
let aboosed = require('./aboose');
let confoosed = require('./confoosed');
let exposed = require('./exposed');
let fail = require('./fail');
let kawaii = require('./kawaii');
let lenny = require('./lenny');
let rekt = require('./rekt');
let triggered = require('./triggered2');
let everyone = require('./everyone');
let googleit = require('./googleit');

console.log('[CPSCMD][FUN][triggers] Building objects...');
aboosed.metadata = {
  category: require('../').category,
  description: 'Aboosed!',
  usage: 'aboosed',
  example: 'aboosed',
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
everyone.metadata = {
  category: require('../').category,
  description: 'Everyone!',
  usage: 'everyone',
  example: 'everyone',
  perm: [['global.fun.triggers.everyone']],
};
kawaii.metadata = {
  category: require('../').category,
  description: 'Kawaii faces!',
  usage: 'kawaii',
  example: 'kawaii',
  perm: [['global.fun.triggers.lenny']],
};
lenny.metadata = {
  category: require('../').category,
  description: 'Lenny!',
  usage: 'lenny',
  example: 'lenny',
  perm: [['global.fun.triggers.lenny']],
};
rekt.metadata = {
  category: require('../').category,
  description: 'Rekt!',
  usage: 'rekt',
  example: 'rekt',
  perm: [['global.fun.triggers.rekt']],
};
triggered.metadata = {
  category: require('../').category,
  description: 'TRIGGERED!',
  usage: 'triggered',
  example: 'triggered',
  perm: [['global.fun.triggers.rekt']],
};
fail.metadata = {
  category: require('../').category,
  description: 'FAIL!!',
  usage: 'fail',
  example: 'fail',
  perm: [['global.fun.triggers.fail']],
};

googleit.metadata = {
  category: require('../').category,
  description: 'GOOGLE IT!',
  usage: 'googelit',
  example: 'googleit',
  perm: [['global.fun.triggers.googleit']],

};

console.log('[CPSCMD][FUN][triggers] Build objects complete!');
module.exports = [
  [aboosed.name, aboosed],
  ['aboose', aboosed],
  [confoosed.name, confoosed],
  [exposed.name, exposed],
  [fail.name, fail],
  ['wasted', fail],
  ['failed', fail],
  [kawaii.name, kawaii],
  [lenny.name, lenny],
  [rekt.name, rekt],
  [triggered.name, triggered],
  [everyone.name, everyone],
  [googleit.name, googleit],
];
