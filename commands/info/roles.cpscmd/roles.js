/* eslint no-await-in-loop: 'off' */
const _ = require('lodash');
const snek = require('snekfetch');
const split = require('../../../rewrite-all/src/deps/functions/splitChunkF').default({ _ });
const { Paginator } = require('../../../rewrite-all/src/struct/client/Paginator');
const { pack } = require('erlpack');

module.exports = {
  name: 'roles',
  async func(msg, { channel, send, guild, member, args, Discord, prefix, Constants }) {
    if (!guild) return send('You must be in a server to use this!');
    if (args[0] && args[0].toLowerCase() === 'all') {
      return send(new Discord.MessageEmbed().setColor(member.displayColor).setTitle(`Role List (${guild.roles.size})`)
        .setDescription(guild
          ._sortedRoles()
          .map(e => _.escapeRegExp(`<@&${e.id}>`))
          .reverse()
          .join(', ')
          .substr(0, 1900)
        ));
    }
    channel.startTyping();
    const data = guild.roles.array()
      .sort((b, a) => b.position - a.position)
      .map(r => {
        let name = Discord.Util.splitMessage(r.name, { maxLength: 30, char: '' });
        if (Array.isArray(name)) name = name.join`\n`;
        return [name, r.members.size];
      });

    const data2 = split(data, { clone: true, size: 10 });
    const fields = [], chunks = [];
    const data2chunked = split(data2, { clone: true, size: 3 });
    for (const chunk of data2chunked) {
      chunks.push((await Promise.all(chunk.map((list, i) => snek.get(`${Constants.APIURL}table`)
        .set('X-Data', pack([['|-- Role name --|', 'Count'], ...list]).toString('base64'))
        .set('X-Data-Transform', 'ERLPACK64')
        .set('X-Data-ID', i)
      ))).sort((a, b) => b.body.id - a.body.id));
    }
    const data3 = _.flatten(chunks);

    for (const eached of data3.map(r => Discord.Util.splitMessage(r.body.data, { maxLength: 975 }))) {
      if (Array.isArray(eached)) {
        const temp = [];
        for (const mytext of eached) {
          temp.push(['\u200B',
            `${'\x60'.repeat(3)}css\n${mytext.replace(new RegExp('\x60', 'g'),
              () => '\x60\u200B')}${'\x60'.repeat(3)}`]);
        }
        fields.push(temp);
      } else {
        fields.push([['\u200B',
          `${'\x60'.repeat(3)}css\n${eached.replace(new RegExp('\x60', 'g'),
            () => '\x60\u200B')}${'\x60'.repeat(3)}`]]);
      }
    }

    const p = new Paginator(msg, {
      type: 'paged',
      embedding: true,
      fielding: true,
      text: `Role Count: __${guild.roles.size}__`,
      pages:
      [
        ...fields,
      ],
    }, Discord);

    try {
      await p.sendFirst();
      channel.stopTyping(true);
    } catch (err) {
      channel.stopTyping(true);
      send('Something went wrong...');
      throw err;
    }
  },
};
