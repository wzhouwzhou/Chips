let embed = (new Discord.MessageEmbed).setDescription(`<@${guild.ownerID}`);

module.exports = {
    name: "serverowner",
    async func(msg, { send, guild }) {
      return send(embed);
    }
};
