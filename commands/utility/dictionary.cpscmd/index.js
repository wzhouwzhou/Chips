
const urbandict = require('./urban');

urban.metadata = {
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
dictionaries.swearlist = [];

needle.get(swears, function(error, response) {
  if (!error && response.statusCode == 200)
    dictionaries.swearlist = JSON.parse(response.body);
});

module.exports = dictionaries;
