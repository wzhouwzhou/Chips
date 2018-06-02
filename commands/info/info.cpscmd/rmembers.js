const path = require('path');
const Searcher = require(path.join(__dirname, '../../../handlers/Searcher')).default;

module.exports = {
  name: 'rmembers',
  async func(msg, { send, suffix, member, guild, args, Discord }) {
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

      let desc = '```', fields = ['\x60'.repeat(3)], i = 0;
      for (const mem of role.members.array()) {
        if (desc.trim().length <= 1950) {
          desc += `${mem.user.tag} `;
        } else if (desc.trim().length > 1950) {
          if (!fields[i]) fields[i] = '';
          if (fields[i].length > 1000) {
            if (i >= 3) {
              send('Member list is too long! Truncating results...');
              break;
            }
            fields[++i] = '\x60'.repeat(3);
          }
          fields[i] += `${mem.user.tag} `;
        }
      }
      const embed = new Discord.MessageEmbed().setDescription(`${desc}\x60\x60\x60`);
      for (const f of fields) embed.addField('\u200B', `${f.trim()}\x60\x60\x60`)
      return send(embed);
    }
  },
};
