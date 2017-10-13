module.exports = {
    name: "serverowner",
    async func(msg, { send, guild, member }) {
      
      let embed = (new Discord.MessageEmbed)
      .setDescription(`<@${guild.ownerID}>`)
      .setColor(member.displayColor);
      
      return send(embed);
    }
};
