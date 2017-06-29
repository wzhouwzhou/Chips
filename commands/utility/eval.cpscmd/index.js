
let regeval = require('./eval');
let asynceval = require('./async');
let pythoneval = require('./python');

console.log('[CPSCMD][UTILITY][eval] Building objects...');
regeval.metadata = {
  category: require('../').category,
  description: 'This command evaluates some javascript!',
  perm: [['OWNER.owner.eval.eval']],
};

asynceval.metadata = {
  category: require('../').category,
  description: 'This command evaluates some javascript in an async function!',
  perm: [['OWNER.owner.eval.async']],
};
pythoneval.metadata = {
  category: require('../').category,
  description: 'This command evaulates some python',
  perm: [['OWNER.owner.eval.eval']],
};

console.log('[CPSCMD][UTILITY][eval] Build objects complete!');
module.exports = [
  [regeval.name,regeval],
  [asynceval.name,asynceval],
  [pythoneval.name,pythoneval],
];
