let cat = require('./cat');
let dog = require('./dog');
let lizard = require('./lizard');

console.log('[CPSCMD][FUN][animals] Building objects...');
let cmds = [cat, dog, lizard];

cmds.forEach(cmd => {
  cmd.metadata = {};
  cmd.metadata.category = require('../').category;
});

cat.metadata.description = 'This command sends cat images!';
dog.metadata.description = 'This command sends dog images!';
lizard.metadata.description = 'This command sends lizard images!';

cat.metadata.usage = 'cat';
dog.metadata.usage = 'dog';
lizard.metadata.usage = 'lizard';

cat.metadata.example = 'cat';
dog.metadata.example = 'dog';
lizard.metadata.example = 'lizard';

cat.metadata.perm = [['global.fun.animals.cat']];
dog.metadata.perm = [['global.fun.animals.dog']];
lizard.metadata.perm = [['global.fun.animals.*']];

console.log('[CPSCMD][FUN][animals] Build objects complete!');

module.exports = [
  [cat.name, cat],
  [dog.name, dog],
  [lizard.name, lizard],
];
