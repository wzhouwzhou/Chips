module.exports = {
    name: 'unverify',
    async func(msg, { send, reply, member, author, content, args, channel, guild, gMember }) {
    if (!guild) {
      return reply('You must use this in a server!');
    }
    if (!args[0]) return reply('No user given :<');
      let targetMember;
      try {
        const target = args[0].match(Constants.patterns.MENTION)[1];
        const user = gMember(target).user;
        targetMember = guild.members.get(user.id);
      } catch (err) {
        return reply(`Invalid user specified`);
      }

      if (targetMember.roles.get('305302877641900052') && targetMember.roles.find('name', 'unverified') &&
      targetMember.roles.find('name', 'Unverified') && targetMember.roles.find('name', 'Unverified-Personel')) {
      return reply(`User does have the unverified role!`);
      } try {
        let therole = targetMember.roles.find('name', 'Verified') || targetMember.roles.find('name', 'Fan') ||
          targetMember.roles.find('name', 'verified');
        const ver = new Discord.MessageEmbed()
          .setTitle(`${targetMember.user.tag
          }, you are now unverified and won\'t have access to the other chats in the server!`);

        await send(targetMember + [], { embed: ver });
        await targetMember.removeRole(guild.roles.find('name', `${therole}`)
          `${member.displayName} unverified ${targetMember.nickname}!`);
        // Duckio
        if (guild.id === '274260111415836675') {
          await targetMember.addRole(guild.roles.find('name', 'Unverified'));
          guild.channels.get('350625721355468800').send(`${targetMember + []} is now unverified! Please be sure to read <#378680507786985472> and <#378680485309710336>.`);
        }
        if (client.memberjoin.verifyLogC[guild.id]) {
          let embed = new Discord.MessageEmbed();
          embed.setTitle('Member Unverification').setColor(_.random(1, 16777215)).setTimestamp();
          embed.setDescription(`<@${targetMember.id}> was just unverified by <@${author.id}>!`);
          if (guild.channels.get(client.memberjoin.verifyLogC[guild.id])) {
            guild.channels.get(client.memberjoin.verifyLogC[guild.id]).send(embed).catch(err => {
              reply('Could not log the unverification...');
              console.log(err);
            });
          }
        }
        return reply('User unverified successfully!');
      } catch (err) {
        console.log(`Could not remove verified role..probably: ${err}`);
        await reply('User not verified :< Something went wrong..');
        throw err;
      } 

    },
};