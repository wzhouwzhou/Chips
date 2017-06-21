
let dm = require('./setdm');
let logstatus = require('./slogstatus');
let out = require('./setoutput');
console.log('[CPSCMD][UTILITY][setchannels] Building objects...');
dm.category = require('../').category;
logstatus.category = require('../').category;
out.category = require('../').category;

dm.description = 'This command sets dmC for the current shard!';
logstatus.description = 'This command logs status for the current shard!';
out.description = 'This command sets output channel for the current shard! (Probably being deprecated)';

console.log('[CPSCMD][UTILITY][setchannels] Build objects complete!');
module.exports = [
  [dm.name,dm],
  [logstatus.name,logstatus],
  [out.name,out],
];
