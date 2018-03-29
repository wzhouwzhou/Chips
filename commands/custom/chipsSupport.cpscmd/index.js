const iWantUpdates = require('./iWantUpdates');
const iHateUpdates = require('./iHateUpdates');
let staffapp = require('./applyForStaff');

staffapp.metadata = {
  category: require('../').category,
  description: 'This command guides you through applying for a staff role in the support server!',
  usage: 'applyforstaff',
  example: 'applyforstaff',
  perm: [['global.custom.chipsSupport.*']],
};

module.exports = [
  [iWantUpdates.name, iWantUpdates],
  [iHateUpdates.name, iHateUpdates],
  [staffapp.name, staffapp],
];
