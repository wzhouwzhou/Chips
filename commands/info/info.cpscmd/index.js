
let info = require('./info');

console.log('[CPSCMD][INFO][info] Building objects...');
info.category = require('../').category;

info.description = 'Shows server, channel, role, and user info.';

info.usage = 'info <object> <extra detail>';

info.example = 'info channel #general';

console.log('[CPSCMD][INFO][info] Build objects complete!');
module.exports = [
  [info.name,info]
];
