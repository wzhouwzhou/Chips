
let cat = require('./cat');
let dog = require('./dog');
console.log('[CPSCMD][FUN][animals] Building objects...');
cat.category = require('../').category;
dog.category = require('../').category;
cat.usage = 'cat';
dogn.usage = 'dog';
cat.description = 'This command sends cat images!';
dog.description = 'This command sends dog images!';
cat.example = 'cat';
dog.example = 'dog';
console.log('[CPSCMD][FUN][animals] Build objects complete!');
module.exports = [
  [cat.name,cat],
  [dog.name,dog],
];
