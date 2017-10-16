module.exports = {
  name: "channelmemberstatus",
  async func(msg, { send, guild, channel, args, member }) {
    if(!guild)
      return send('You must be in a server to use this');
    const idle = channel.members.filter(m=>m.presence.status==='idle').size;
    const online = channel.members.filter(m=>m.presence.status==='online').size;
    const dnd = channel.members.filter(m=>m.presence.status==='dnd').size;
    const invis = channel.members.filter(m=>!m.presence||m.presence.status==='offline').size;
    const embed = (new Discord.MessageEmbed)
      .setTitle('Help')
      .setDescription('All commands for "channelmemberstatus" are:\n - channelmemberstatus\n - channelmemberstatus dnd\n - channelmemberstatus idle\n - channelmemberstatus online\n - channelmemberstatus offline')
      .setColor(member.displayColor);

    if (!args[0])
      return send(`There are ${online} people online, ${idle} people idle, ${dnd} people dnd, and ${invis} people invisible.`);

    if (args[0]==='help')
      return send(embed);

    if (args[0]==='dnd')
      return send(dnd + " members are dnd!");

    if (args[0]==='idle')
      return send(idle+ " members are idle!");

    if (args[0]==='online')
      return send (online + " members are online!");

    if (~'invisible offline invis off'.split(/\s+/).indexOf(args[0]))
      return send (invis + " members are invisible or offline!");

  }
};
