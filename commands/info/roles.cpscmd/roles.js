/* eslint no-await-in-loop: 'off' */
const _ = require('lodash');
const split = require('../../../rewrite-all/src/deps/functions/splitChunkF').default({ _ });
const { Paginator } = require('../../../rewrite-all/src/struct/client/Paginator');
const { pack } = require('erlpack');

module.exports = {
  name: 'roles',
  async func(msg, { send, guild, member, args, Discord, prefix }) {
    if (!guild) return send('You must be in a server to use this!');
    if (args[0] && args[0].toLowerCase() === 'all') {
      return send(new Discord.MessageEmbed().setColor(member.displayColor).setTitle(`Role List (${guild.roles.size})`)
        .setDescription(guild._sortedRoles().map(e => _.escapeRegExp(`<@&${e.id}>`)).reverse()
          .join(', ')));
    }

    const data = guild.roles.array()
      .sort((b, a) => b.position - a.position)
      .map(r => {
        let name = Discord.Util.splitMessage(r.name, { maxLength: 30, char: '' });
        if (Array.isArray(name)) name = name.join`\n`;
        return [name, r.members.size];
      });

    const data2 = split(data, { clone: true, size: 10 });
    const fields = [];
    const data3 = data2.map((list, i) => {
      return require('snekfetch')
        .get('http://api.localhost:51001/table')
        .set('X-Data', pack([['|-- Role name --|', 'Count'], ...list]).toString('base64'))
        .set('X-Data-Transform', 'ERLPACK64')
        .set('X-Data-ID', i);
    });

    for (const eached of await Promise.all(data3)
      .sort((a, b) => b.body.id - a.body.id)
      .map(r => Discord.Util.splitMessage(r.body.data, { maxLength: 975 }))
    ) {
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
      text: `Type __${_.escapeRegExp(prefix)}${this.name} all__  to see the whole list`,
      pages:
      [
        ...fields,
      ],
    }, Discord);

    try {
      return await p.sendFirst();
    } catch (err) {
      console.error(err);
      return send('Something went wrong...');
    }
  },
};
