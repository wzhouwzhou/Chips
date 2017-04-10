module.exports = {
  name: "ban",
  async func(msg, { send, member, author, channel }) {
    const used = member || author;
    switch (used.id) {
      case "259209114268336129":
      case "265611625283715072":
        break;
      default:
        return send(`No bans for you! ${member.displayName}`);
    }

    let target = content.split(' ')[1];

    send(`${member.displayName}, user banned succesfully!`);

    channel.createWebhook("Mee6#4876", "https://cdn.discordapp.com/avatars/159985870458322944/675866cce22f49524a5d25e61859d23e.jpg?size=1024").then (hook => {
      hook.sendMessage(`**${target}** left!`)
      .then(m => {hook.delete();})
      .catch(console.log);
    });
  }
};
