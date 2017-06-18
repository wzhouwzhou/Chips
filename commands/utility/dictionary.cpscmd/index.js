const needle = require ('needle');
const urbandict = require('./urbandict');

urbandict.metadata = {
  category: require('../').category,
  description: 'Searches some stuff on urban dict!',
  usage: 'urban <query> <optional flag>',
  example: 'urban trollface --filternsfw',
  perm: [['global.utility.dictionary.urban']],
};

const dictionaries = [
  [urbandict.name, urbandict],
];

const swears = 'https://raw.githubusercontent.com/ChaseFlorell/jQuery.ProfanityFilter/master/swearWords.json';
client.swearlist = [];

needle.get(swears, function(error, response) {
  if (!error && response.statusCode == 200)
    client.swearlist = response.body;
});

module.exports = dictionaries;
