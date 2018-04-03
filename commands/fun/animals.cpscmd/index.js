/* eslint no-console: 'off'*/
let cat = require('./cat');
let dog = require('./dog');
let lizard = require('./lizard');
let fox = require('./fox');

console.log('[CPSCMD][FUN][animals] Building objects...');
let cmds = [cat, dog, lizard, fox];

cmds.forEach(cmd => {
  cmd.metadata = {};
  cmd.metadata.category = require('../').category;
});

cat.metadata.description = 'This command sends cat images!';
dog.metadata.description = 'This command sends dog images!';
lizard.metadata.description = 'This command sends lizard images!';
fox.metadata.description = 'This command sends fox images!';

cat.metadata.usage = 'cat';
dog.metadata.usage = 'dog';
lizard.metadata.usage = 'lizard';
fox.metadata.usage = 'fox';

cat.metadata.example = 'cat';
dog.metadata.example = 'dog';
lizard.metadata.example = 'lizard';
fox.metadata.example = 'fox';

cat.metadata.perm = [['global.fun.animals.cat']];
dog.metadata.perm = [['global.fun.animals.dog']];
lizard.metadata.perm = [['global.fun.animals.*']];
fox.metadata.perm = [['global.fun.animals.*']];

console.log('[CPSCMD][FUN][animals] Build objects complete!');

module.exports = [
  [cat.name, cat],
  [dog.name, dog],
  [lizard.name, lizard],
  [fox.name, fox],
];
