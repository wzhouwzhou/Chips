module.exports = {
  name: "ban",
  async func(msg, { send, member, author, content, channel, guild }) {
    const used = member || author;
    switch (used.id) {
      case "259209114268336129":
      case "265611625283715072":
        break;
      default:
        return send(`No bans for you! ${member.displayName}`);
    }

    let target = content.split(' ')[1];
    target=target.substring(3,target.length-1);
    console.log("Target: "+target);

    let user = guild.members.get(target).user.username;

    target=target.substring(1,target.length-5);

    send(`${member.displayName}, user banned succesfully!`);

    channel.createWebhook("Mee6", "https://cdn.discordapp.com/avatars/159985870458322944/675866cce22f49524a5d25e61859d23e.jpg?size=1024")
      .then (whook => whook.edit('Mee6', 'https://cdn.discordapp.com/avatars/159985870458322944/675866cce22f49524a5d25e61859d23e.jpg?size=1024')
    ).then(hook => {
      hook.sendMessage(`**${user}** left`)
      .then(m => {hook.delete();})
      .catch(console.log);
    });
  }
};
