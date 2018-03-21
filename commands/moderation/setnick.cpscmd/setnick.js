module.exports = {
  name: 'setnick',
  async func(msg, { guild, author, send, member, suffix, prefix, args }) {
    if (!guild) {
      return send('You must use this command in a server.');
    }
    const targetMember = msg.mentions.members.first();
    if (!args[0] || !args[0].match(/^[^]*<@!?(\d+)>[^]*$/)) {
      return send(`You must mention someone to change their nickname. Use ${prefix}help ${this.name} for more info.`);
    }
    if (targetMember.id === author.id) return send('You can use /nick for that');
    let newnick = null;
    if (!args[1]) {
      if (member.displayName === member.user.username) {
        return send('Please specify a new nick to set.');
      }
      newnick = member.user.username;
    }

    if (member.highestRole.position < targetMember.highestRole.position) {
      return send(`That member has a role above your highest role!`);
    } else if (member.highestRole.position === targetMember.highestRole.position) {
      return send(`That member has a role is equal to your highest role!`);
    }
    if (!newnick) newnick = suffix.substr(suffix.indexOf(args[1]));

    await targetMember.setNickname(newnick);
    return send(`Succesfully set ${targetMember + []}'s nickname to ${newnick}`);
  },
};
