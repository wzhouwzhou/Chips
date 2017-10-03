const _ = require('lodash');
const ships = new Map, shipComments = new Map;
ships.set('259209114268336129,286522718965465090', 100);
shipComments.set('259209114268336129,286522718965465090', 'Ily bb :3');

module.exports = {
  name: 'ship',
  async func(msg, { send, Discord, client, suffix, member, guild }) {
    if(!guild) return send('You must be in a server to use this.');

    if(!suffix || suffix.length === 0)
      return send('Nobody to ship with!');

    const matches = suffix.match(/^[^<]*<@!?(\d+)>[^<>]*(?:<@!?(\d+)>)?[^]*$/);
    if(!matches||!matches[1]) return send('You must mention a user!');

    let targetOne = matches[1];

    let targetTwo = matches[2];
    if(!targetTwo) {
      targetTwo = targetOne;
      targetOne = member;
    }

    let userOne, userTwo;
    try {
      userOne = await client.fetchUser(targetOne);
      userTwo = await client.fetchUser(targetTwo);
    } catch(err) {
      return send('An error occured, are you sure you mentioned valid members?');
    }
    const assembled = `${[userOne.id,userTwo.id].sort((a,b)=>a-b).join(',')}`;
    const shipValue = ships.get(assembled)||~~(100*Math.random());
    ships.set(assembled, shipValue);
    const outlookN = ~~(shipValue/10);
    const progressbar = '█'.repeat(outlookN);

    const comment = shipComments.get(assembled)||_.sample([
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
          case 7 < outlookN && outlookN < 10:
            return 'owo';
          case outlookN > 9:
            return 'What are you waiting for?';
        }
      })(),
    ]);
    const embed = new Discord.RichEmbed().setTitle('Ship').setDescription(`${userOne+[]} x ${userTwo+[]}`);
    embed.addField(comment, `${progressbar} ${shipValue}%`);
    send(embed);
  }
};
