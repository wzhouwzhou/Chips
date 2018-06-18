const path = require('path');
const Searcher = require(path.join(__dirname, '../../../handlers/Searcher')).default;
const Paginator = require('../../../rewrite-all/src/struct/client/Paginator').Paginator;

module.exports = {
  name: 'rmembers',
  async func(msg, { send, reply, suffix, member, guild, args, Discord }) {
    if (!guild) return reply('This command can only be used in a server.');
    if (guild) {
      let options = { guild: guild };
      global.searchers[guild.id] = new Searcher(options.guild);
    }
    if (!args[0]) {
      return send('No role given :<');
    } else {
      let role;
      try {
        role = args[0];
        role = guild.roles.get(role);
        if (!role) throw new Error('NotRoleId');
      } catch (err) {
        role = suffix;
        let list = global.searchers[guild.id].searchRole(role);
        if (list.length > 1) {
          await send('Multiple matches found, using first one..');
        } else if (list.length < 1) {
          return send(new Discord.MessageEmbed().setColor(member.displayColor).setDescription(`Role [${role}] not found!`));
        }
        role = list[0];
      }
      if (role.members.size === 0) return send('Nobody has this role!');

      let descs = ['```css\n'], i = 0;
      for (const mem of role.members.array()) {
        if (!descs[i]) descs[i] = '```';
        if (descs[i].trim().length > 1950) {
          descs[++i] = '```css\n';
        }
        descs[i] += `${mem.user.tag}\n`;
      }
      if (descs.length === 1) {
        const embed = new Discord.MessageEmbed().setTitle(`Members with the role ${role.name}`).setDescription(`${descs[0]}\x60\x60\x60`);
        return send(embed);
      }

      const p = new Paginator(msg, {
        type: 'paged',
        embedding: true,
        fielding: false,
        title: `${role.members.size} members with the role ${role.name}`,
        pages: descs.map(e => `${e}${'\x60'.repeat(3)}`),
      }, Discord);

      return p.sendFirst();
    }
  },
};
