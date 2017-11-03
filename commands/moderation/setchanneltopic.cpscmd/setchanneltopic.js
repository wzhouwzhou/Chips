module.exports = {
  name: 'setchanneltopic',
  async func(msg, { send, guild, member, args, channel, suffix }) {
    if (!suffix) return send('Nothing provided to set as channel topic');
    if (suffix.length > 1024) return send('The channel topic can only be a maximum of 1024 characters in length!');

    await channel.setTopic(suffix.substring(suffix.indexOf(args[0])));
    
    let embed = (new Discord.MessageEmbed)
      .setTitle('Channel Topic')
      .setDescription(`Channel topic set to \"${_.escapeRegExp(channel.topic).replace(/@/g, '(at)')}\" succesfully!`)
      .setColor(member.displayColor);
    
    return send(embed);
  },
};
