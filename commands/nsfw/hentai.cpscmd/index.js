let hentai = require('./hentai');
let autohentai;

console.log('[CPSCMD][NSFW][hentai] Building objects...');

hentai.metadata = {
  category: require('../').category,
  description: 'The name of this command is self explanatory.',
  usage: 'hentai <no arguments>',
  example: 'hentai',
  perm: [['global.nsfw.hentai.image']],
};

console.log('[CPSCMD][NSFW][hentai] Build objects complete!');
module.exports = [
  [hentai.name, hentai],
];
