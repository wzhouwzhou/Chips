const _ = require('lodash');
const ships = new Map, shipComments = new Map, shipJoin = new Map;
ships.set('259209114268336129,286522718965465090', 100);
shipComments.set('259209114268336129,286522718965465090', 'Ily bb :3');
shipJoin.set('259209114268336129,286522718965465090','<:blobkissheart:364815765045510145>');
ships.set('205608598233939970,296855425255473154', 4200);
shipComments.set('205608598233939970,296855425255473154', 'Easter egg confirmed!');
shipJoin.set('205608598233939970,296855425255473154','<:blobkiss:364806533034278914>');

module.exports = {
  name: 'ship',
  async func(msg, { send, Discord, client, suffix, member, guild }) {
    if(!guild) return send('You must be in a server to use this.');

    if(!suffix || suffix.length === 0)
      return send('Nobody to ship with!');

    let matches = suffix.match(/(?:"?(?:([^"#<]{1,32}#(?:\d){4,4}))|(?:<@!?(\d+)>)"?)(?:\s|,|x)*(?:"?(?:(?:([^"#<]{1,32}#(?:\d){4,4}))|(?:<@!?(\d+)>))"?)?/);
    if(!matches||(!matches[1]&&!matches[2]&&!matches[3]&&!matches[4])) return send('You must mention a user or give their discord tag!');
    let targetOne = matches[1]||matches[2];
    let targetTwo = matches[3]||matches[4];

    if(!targetTwo) {
      targetTwo = targetOne;
      targetOne = member.id;
    }

    let userOne, userTwo;
    try {
      userOne = !~targetOne.indexOf('#')?await client.fetchUser(targetOne):client.users.find('tag',targetOne);
      userTwo = !~targetTwo.indexOf('#')?await client.fetchUser(targetTwo):client.users.find('tag',targetTwo);
      if(!userOne||!userTwo) throw new Error('Invalid user');
    } catch(err) {
      send(`[Error][Debug] m,t1,t2:${err.message}, ${targetOne},${targetTwo}`);
      return send('An error occured, are you sure you mentioned valid members?');
    }
    if(userOne.id === userTwo.id)
      if(userOne.id === member.id)
        return send('Are you really that alone?');
      else return send(`Is ${userTwo.tag.replace(/@/g,'(at)')} really that alone?`);
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
    const joiner = (()=>{
      switch(true) {
        case outlookN < 2: return '<:blobnausea:364807145910435840>';
        case outlookN > 8: return '😍';
      }
    })();
    const embed = new Discord.RichEmbed().setTitle('Ship').setDescription(`${userOne+[]} ${shipJoin.get(assembled)||joiner||'x'} ${userTwo+[]}`);
    embed.addField(comment, `${progressbar} ${shipValue}%`);
    send(embed);
  }
};
