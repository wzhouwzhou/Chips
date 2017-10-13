let owner = guild.ownerID

module.exports = {
    name: "serverowner",
    async func(msg, { send }) {
      return send(`<@!${owner}>`);
    }
};
