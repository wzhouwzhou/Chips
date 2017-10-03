const _ = require('lodash');

module.exports = {
  name: 'ship',
  async func(msg, { args, send }) {
    if(!suffix || suffix.length === 0)
      return send('Nobody to ship with!');

    const matches = suffix.match(/^[^<]*<@!?(\d+)>[^<>]*(?:<@!?(\d+)>)?[^]*$/);

    const targetOne = matches[1];
    if(!targetOne) return send('You must mention a user!');
    const userOne = await client.fetchUser(targetOne);

    const targetTwo = matches[2] || targetOne;

    const comment = _.sample([
      (()=>{
        switch(outlookN) {
          case 0:
          case 1:
            return 'No way.';
          case 2:
          case 3:
            return 'Nope.';
          case 4:
          case 5:
          case 6:
            return 'Maybe.';
          case 7:
            return 'Yup';
          case 8:
            return 'Sure.';
          case 9:
            return 'Definitely';
          case 10:
          case 11:
            return 'What are you waiting for?';
        }
      })(),
      (()=>{
        switch(true) {
          case outlookN < 4:
            return 'RIP';
          case 3 < outlookN && outlookN < 8:
            return 'Noice.';
          case outlookN > 7:
            return 'owo';
        }
      })(),
    ]);
  }
};
