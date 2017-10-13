const embed = (new Discord.MessageEmbed).setDescription(`<@${guild.ownerID}`).setColor(member.displayColor);

module.exports = {
    name: "serverowner",
    async func(msg, { send, guild, member }) {
      return send(embed);
    }
};
