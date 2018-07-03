module.exports = {
  name: 'quickstats',
  async func(msg, { send, client }) {
    const [members, guilds] = await client.shard.broadcastEval(
      '[client.guilds.array().map(g => g.members.size).reduce((a, b) => a + b, 0), client.guilds.size]')
      .then(r => [r.reduce((a, b) => a + b[0], 0), r.reduce((a, b) => a + b[1], 0)]);
    return send(`**${members}** members in **${guilds}**guilds\nAverage Server Size: **${members / guilds}**`);
  },
};
