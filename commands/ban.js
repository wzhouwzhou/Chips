module.exports = {
  name: "ban",
  async func(msg, { send, member, author, content, channel, guild, args, gMember }) {
    const used = member || author;
    switch (used.id) {
      case Constants.users.WILLYZ:
      case Constants.users.PGSUPER:
      case Constants.users.ZALGO:
        break;
      default:
        return send(`No bans for you! ${member.displayName}`);
    }
    if (!args[0]) return send("No user given :(");
    const target = args[0].match(Constants.patterns.MENTION)[1];
    // console.log("Target: "+target);

    const user = gMember(target).user.username;


    send(`${member.displayName}, user banned succesfully!`);

    channel.createWebhook("Mee6", Constants.avatars.MEE6)
      .then (whook => whook.edit('Mee6', Constants.avatars.MEE6))
      .then(hook => hook.sendMessage(`**${user}** left`)
        .then(m => {hook.delete();})
        .catch(console.error)
      );
  }
};
