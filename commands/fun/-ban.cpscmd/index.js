
let fakeban = require('./-ban');
console.log('[CPSCMD][FUN][fakeban] Building objects...');
fakeban.category = require('../').category;

fakeban.description = 'This command fake bans someone!';

console.log('[CPSCMD][FUN][fakeban] Build objects complete!');
module.exports = [
  [fakeban.name,fakeban],
];
