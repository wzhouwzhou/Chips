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

      let memList = '';
      for (const mem of role.members.array()) {
        memList += `${mem.user.tag} `;
        if (memList.trim().length > 1950) {
          send('Member list is too long! Truncating results...');
          break;
        }
      }
      return send(`${memList ? memList.trim() : 'Nobody has this role!'}`);
    }
  },
};
