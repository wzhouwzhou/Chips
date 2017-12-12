const _ = require('lodash');
const ships = new Map, shipComments = new Map, shipJoin = new Map;

const lucheps = '205608598233939970,296855425255473154';
ships.set(lucheps, 420);
shipComments.set(lucheps, `Marriage when?!`);
shipJoin.set(lucheps, '<:blobkiss:372739966100439042>');

// Lucas and chips

const lukat = '205608598233939970,214234647947771907';
ships.set(lukat, 6969);
shipComments.set(lukat, '❤ real di-love when ❤ ');
shipJoin.set(lukat, '<:blobkiss:372739966100439042>');

// Lucas & Kat

const veedp = '250815960250974209,365972456139390977';
ships.set(veedp, 9001);
shipComments.set(veedp, '❤It\'s❤Over❤Nine❤Thousand❤');
shipJoin.set(veedp, '❤❤❤❤❤');

// Evildeathpro and Vee

const sorachino = '277969198401978379,296934568068513793';
ships.set(sorachino, 100);
shipComments.set(sorachino, 'OwO You guys are perfect for each other');
shipJoin.set(sorachino, '🌹❤');

const cursedwilly = '259209114268336129,374022684519956480';
ships.set(cursedwilly, 100);
shipComments.set(cursedwilly, '美神 🌹 We were meant to be together!');
shipJoin.set(cursedwilly, '❤');

module.exports = {
  name: 'ship',
  async func(msg, { send, Discord, client, suffix, member, guild }) {
    if (!guild) return send('You must be in a server to use this.');

    if (!suffix || suffix.length === 0) return send('Nobody to ship with!');

    let matches = suffix.match(/(?:"?(?:([^"#<]{1,32}#(?:\d){4,4}))|(?:<@!?(\d+)>)"?)(?:\s|,|x)*(?:"?(?:(?:([^"#<]{1,32}#(?:\d){4,4}))|(?:<@!?(\d+)>))"?)?/);
    if (!matches || (!matches[1] && !matches[2] && !matches[3] && !matches[4])) return send('You must mention a user or give their discord tag!');
    let targetOne = matches[1] || matches[2];
    let targetTwo = matches[3] || matches[4];

    if (!targetTwo) {
      targetTwo = targetOne;
      targetOne = member.id;
    }

    let userOne, userTwo;
    try {
      userOne = !~targetOne.indexOf('#') ? await client.users.fetch(targetOne) : client.users.find('tag', targetOne);
      userTwo = !~targetTwo.indexOf('#') ? await client.users.fetch(targetTwo) : client.users.find('tag', targetTwo);
      if (!userOne || !userTwo) throw new Error('Invalid user');
    } catch (err) {
      send(`[Error][Debug] m,t1,t2:${err.message}, ${targetOne},${targetTwo}`);
      return send('An error occured, are you sure you mentioned valid members?');
    }
    if (userOne.id === userTwo.id) {
      if (userOne.id === member.id) return send('Are you really that alone?');
      else return send(`Is ${userTwo.tag.replace(/@/g, '(at)')} really that alone?`);
    }
    const assembled = `${[userOne.id, userTwo.id].sort((a, b) => a - b).join(',')}`;
    const shipValue = ships.get(assembled) || ~~(100 * Math.random());
    ships.set(assembled, shipValue);
    const outlookN = ~~(shipValue / 10);
    const progressbar = '█'.repeat(outlookN);

    const comment = shipComments.get(assembled) || _.sample([
      (() => {
        switch (outlookN) {
          case 0:
          case 1:
            return 'Don\'t even think about it.';
          case 2:
          case 3:
            return 'No way.';
          case 4:
          case 5:
          case 6:
            return 'Maybe.';
          case 7:
            return 'Try it!';
          case 8:
            return 'Yup!';
          case 9:
            return 'Definitely!';
          case 10:
          case 11:
            return 'What are you waiting for?!';
        }
      })(),
      (() => {
        switch (true) {
          case outlookN < 4:
            return 'RIP';
          case outlookN > 3 && outlookN < 8:
            return 'Noice.';
          case outlookN > 7 && outlookN < 10:
            return 'owo';
          case outlookN > 9:
            return 'What are you waiting for?!';
        }
      })(),
    ]);
    const joiner = (() => {
      switch (true) {
        case outlookN < 2: return ' <:blobnausea:372214877248552960>';
        case outlookN > 8: return '😍';
      }
    })();
    const embed = new Discord.MessageEmbed().setTitle('Ship').setDescription(`${userOne + []} ${shipJoin.get(assembled) || joiner || 'x'} ${userTwo + []}`);
    embed.addField(comment, `${progressbar} ${shipValue}%`);
    send(embed);
  },
};
