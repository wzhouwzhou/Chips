/* eslint no-console: 'off' */

console.log('[CPSCMD][FUN][image] Building objects...');

let opinion, happy, wesmart;
const cmds = [
  opinion = require('./opinion'),
  happy = require('./happy'),
  wesmart = require('./wesmart'),
];

const cmdexport = [];

cmds.forEach(cmd => {
  cmd.metadata = {};
  cmd.metadata.category = require('../').category;
  cmdexport.push([cmd.name, cmd]);
});

opinion.metadata.description = 'For use when someone has an opinion';
opinion.metadata.usage = 'opinion <no args>';
opinion.metadata.example = 'opinion';
opinion.metadata.perm = [['global.fun.image.opinion']];

happy.metadata.description = 'Be happy';
happy.metadata.usage = 'happy <no args>';
happy.metadata.example = 'happy';
happy.metadata.perm = [['global.fun.image.happy']];

wesmart.metadata.description = "It's good to know things";
wesmart.metadata.usage = 'wesmart <no args>';
wesmart.metadata.example = 'wesmart';
wesmart.metadata.perm = [['global.fun.image.wesmart']];
cmdexport.push(['smart', wesmart]);

console.log('[CPSCMD][FUN][image] Build objects complete!');

module.exports = cmdexport;
