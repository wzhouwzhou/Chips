module.exports = {
  name: 'userid',
  async func(msg, { args, send, author }) {
    if (!args[0]) {
      return send(`${author.id}`);
    }

    if (args[0] && !args[0].match(/^[^]*<@!?(\d+)>[^]*$/)) {
      return send(`Did you mention someone?`);
    }

    if (args[0].match(/^[^]*<@!?(\d+)>[^]*$/)) {
      let targetUser = msg.mentions.members.first();
      return send(`${targetUser.id}`);
    }
  },
};
