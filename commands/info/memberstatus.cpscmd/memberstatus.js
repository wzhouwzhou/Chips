module.exports = {
  name: "memberstatus",
  async func(msg, { send, channel, guild, args }) {
    if(!guild)
      return send('You must be in a server to use this');
    const idle = guild.members.filter(m=>m.presence.status==='idle').size;
    const online = guild.members.filter(m=>m.presence.status==='online').size;
    const dnd = guild.members.filter(m=>m.presence.status==='dnd').size;
    const invis = guild.members.filter(m=>m.presence.status==='offline').size;

    if (!args[0])
      return send(`There are ${online} people online, ${idle} people idle, ${dnd} people dnd, and ${invis} people invisible.`);

    if (args[0]==='help')
      return send('All commands for \"memberstatus\" are:\n - memberstatus\n - memberstatus dnd\n - memberstatus idle\n - memberstatus online\n - memberstatus offline')
    
    if (args[0]==='dnd')
      return send(dnd + " members are dnd!");

    if (args[0]==='idle')
      return send(idle+ " members are idle!");

    if (args[0]==='online')
      return send (online + " members are online!");

    if (~'invisible offline invis'.split(/\s+/).indexOf(args[0]))   
      return send (invis + " members are invisible or offline!");

  }

};
