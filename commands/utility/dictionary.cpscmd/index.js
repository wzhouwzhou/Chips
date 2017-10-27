const needle = require('needle');
const urbandict = require('./urbandict');

urbandict.metadata = {
  category: require('../').category,
  description: 'Searches some stuff on urban dict!',
  usage: 'urban <query> <optional flag>',
  example: 'urban trollface --filternsfw',
  perm: [['global.utility.dictionary.urban']],
};

const swears = 'https://raw.githubusercontent.com/ChaseFlorell/jQuery.ProfanityFilter/master/swearWords.json';
client.swearlist = [];

needle.get(swears, (error, response) => {
  if (error) throw error;
  if (!error && response.statusCode == 200) client.swearlist = JSON.parse(response.body);
});

module.exports = [
  [urbandict.name, urbandict],
];
