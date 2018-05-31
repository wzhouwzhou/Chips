module.exports = {
  name: 'instaban',
  func(msg, { send, reply, member, Discord, content, args, guild, gMember, client }) {
    let memberToUse;
    try {
      if (!args[0]) return reply('Please specify a user to instaban!');
      let target = (args[0].match(Constants.patterns.MENTION) || [0, null])[1];
      let chipstarget = (args[0].match(Constants.users.CHIPS) || [0, null])[1];
      if (!target) return reply('Please specify a valid user to instaban!');
      memberToUse = gMember(target);
      if (chipstarget) return send('You can\'t ban me!');
      if (!memberToUse) return reply('Invalid member!');
      if (member.id === memberToUse.id) return reply("I can't let you ban yourself >.>");
      if (memberToUse.highestRole.position >= member.highestRole.position) return reply("That member's highest role is higher than or equal to the position to yours!");
    } catch (err) {
      send('Could not ban...');
      throw err;
    }

    let reason;
    if (args[1]) reason = content.substring(content.indexOf(args[1]));
    if (!reason) reason = 'No reason provided.';

    if (!memberToUse.bannable) return reply("Uh oh! I can't ban this user! Perhaps I am missing perms..");

    // Console.log("[Ban] Banning...");
    let emb = new Discord.MessageEmbed()
      .setAuthor('Ban Notice!')
      .setTitle(`You were banned from the server: ${guild.name}!`)
      .setColor(9109504)
      .setThumbnail(Constants.images.WARNING)
      .addField('Ban reason: ', `${reason}`, true);
    return Promise.resolve(client.users.fetch(memberToUse.id)
      .then(u => u.send('Uh oh!', { embed: emb }))
      .then(() => {
        reply('Banning!');
        return memberToUse.ban({ reason: `[BAN]: [Author]: ${msg.author.tag} [Reason]: ${reason}` });
      })
      .catch(() => {
        msg.reply('Could not dm the user, but banning anyway!');
        return memberToUse.ban({ reason: `[BAN]: [Author]: ${msg.author.tag} [Reason]: ${reason}` });
      }));
  },
};
