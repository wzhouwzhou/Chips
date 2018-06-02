module.exports = {
    name: 'rmembers',
    func(msg, { send, channel, guild }) {
    if (!args[0]) { return send('No role given :<'); 
} else {  
    let role;
    try {
      role = args[0].substring(3, args[0].length - 1);
      console.log(`Trying to find role from mention ${role}`);
      role = guild.roles.get(role);
      if (!role) throw 'NotRoleId';
    } catch (err) { // Failed to find by id
      role = content.substring(`${prefix}info ${action} `.length);
      let list = searchers[guild.id].searchRole(role);
      if (list.length > 1) {
        await send('Multiple matches found, using first one..');
      } else if (list.length < 1) {
        return send(new Discord.MessageEmbed().setColor(member.displayColor).setDescription(`Role [${role}] not found!`));
      }
      role = list[0];
    }

    let memList = '';
    for (mem of role.members.array()) {
      memList += `[<@${mem.id}>] `;
      if (memList.length > 1000) {
        memList = 'Member list is too long!';
        break;
      }
    }
    send(`${memList ? memList : 'Nobody has this role!'}`)
      }
    },
};
