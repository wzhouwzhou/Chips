/* eslint no-console: 'off' */
let aboosed = require('./aboose');
let confoosed = require('./confoosed');
let exposed = require('./exposed');
let fail = require('./fail');
let kawaii = require('./kawaii');
let lenny = require('./lenny');
let rekt = require('./rekt');
let triggergif = require('./triggergif');
let everyone = require('./everyone');
let googleit = require('./googleit');
let ree = require('./ree');
let hug = require('./hug2');

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
triggergif.metadata = {
  category: require('../').category,
  description: 'TRIGGERED!',
  usage: 'triggergif',
  example: 'triggergif',
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

ree.metadata = {
  category: require('../').category,
  description: 'REE',
  usage: 'ree',
  example: 'ree',
  perm: [['global.fun.triggers.*']],

};

hug.metadata = {
  category: require('../').category,
  description: 'Hug!',
  usage: 'hug',
  example: 'hug',
  perm: [['global.fun.triggers.*']],

};


console.log('[CPSCMD][FUN][triggers] Build objects complete!');
module.exports = [
  [aboosed.name, aboosed],
  ['aboose', aboosed],
  [confoosed.name, confoosed],
  ['confused', confoosed],
  [exposed.name, exposed],
  [fail.name, fail],
  ['wasted', fail],
  ['failed', fail],
  [kawaii.name, kawaii],
  [lenny.name, lenny],
  [rekt.name, rekt],
  [triggergif.name, triggergif],
  [everyone.name, everyone],
  [googleit.name, googleit],
  [ree.name, ree],
  [hug.name, hug],
];
