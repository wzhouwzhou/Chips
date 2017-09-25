
let regeval = require('./eval');
let asynceval = require('./async');
let pythoneval = require('./python');
let git = require('./git');

console.log('[CPSCMD][UTILITY][eval] Building objects...');
regeval.metadata = {
  category: require('../').category,
  description: 'This command evaluates some javascript!',
  perm: [['OWNER.eval.js']],
};

asynceval.metadata = {
  category: require('../').category,
  description: 'This command evaluates some javascript in an async function!',
  perm: [['OWNER.eval.async']],
};
pythoneval.metadata = {
  category: require('../').category,
  description: 'This command evaulates some python',
  perm: [['OWNER.eval.python']],
};

git.metadata = {
  category: require('../').category,
  description: 'This command provides shortcut for git things',
  perm: [['OWNER.eval.git']],
};

console.log('[CPSCMD][UTILITY][eval] Build objects complete!');
module.exports = [
  [regeval.name,regeval],
  [asynceval.name,asynceval],
  [pythoneval.name,pythoneval],
  [git.name, git],
];
