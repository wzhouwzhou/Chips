module.exports = {
    name: "serverowner",
    async func(msg, { send, guild }) {
      return send(`<@${guild.ownerID}>`);
    }
};
