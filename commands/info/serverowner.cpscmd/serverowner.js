const embed = (new Discord.MessageEmbed)
.setTitle('Channel Topic')
.setDescription(`<@${guild.ownerID}`)
.setColor(member.displayColor);

module.exports = {
    name: "serverowner",
    async func(msg, { send, guild }) {
      return send(embed);
    }
};
