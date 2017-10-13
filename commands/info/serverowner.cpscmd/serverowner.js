let sowner = guild.ownerID

module.exports = {
    name: "serverowner",
    async func(msg, { send }) {
      return send(`<@!${sowner}>`);
    }
};
