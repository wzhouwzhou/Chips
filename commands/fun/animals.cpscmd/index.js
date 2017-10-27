let cat = require('./cat');
let dog = require('./dog');

console.log('[CPSCMD][FUN][animals] Building objects...');
let cmds = [cat, dog];

cmds.forEach(cmd => {
  cmd.metadata = {};
  cmd.metadata.category = require('../').category;
});

cat.metadata.description = 'This command sends cat images!';
dog.metadata.description = 'This command sends dog images!';

cat.metadata.usage = 'cat';
dog.metadata.usage = 'dog';

cat.metadata.example = 'cat';
dog.metadata.example = 'dog';

cat.metadata.perm = [['global.fun.animals.cat']];
dog.metadata.perm = [['global.fun.animals.dog']];

console.log('[CPSCMD][FUN][animals] Build objects complete!');

module.exports = [
  [cat.name, cat],
  [dog.name, dog],
];
