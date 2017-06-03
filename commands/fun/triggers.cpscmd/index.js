
let lenny = require('./lenny');
let aboose = require('./aboose');
let exposed = require('./exposed');
let rekt = require('./rekt');

console.log('[CPSCMD][FUN][triggers] Building objects...');
lenny.category = require('../').category;
aboose.category = require('../').category;
exposed.category = require('../').category;
rekt.category = require('../').category;

lenny.description = 'Lenny!';
aboose.description = 'Aboose!';
exposed.description = 'Exposed!';
rekt.description = 'This command sends the rekt gif!';

lenny.usage = 'lenny';
aboose.usage = 'aboose';
exposed.usage = 'exposed';
rekt.usage = 'rekt';

lenny.example = 'lenny';
aboose.example = 'aboose';
exposed.example = 'exposed';
rekt.example = 'rekt';

console.log('[CPSCMD][FUN][triggers] Build objects complete!');
module.exports = [
  [lenny.name,lenny],
  [aboose.name,aboose],
  [exposed.name,exposed],
  [rekt.name,rekt],
];
