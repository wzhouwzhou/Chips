module.exports = {
  name: "stafflogs",
  customperm: ["MANAGE-CHANNELS"],
  async func(msg, { channel, args, guild, send, member }) {
    
    let stafflogs = guild.channels.find('name', 'staff-logs');
    
    if(!member.hasPermission("MANAGE_CHANNELS"))
      return send('You need `MANAGE_CHANNELS` permissions to use this command!')
    
    if(stafflogs) 
      return send('You already have a staff-logs channel: ' + stafflogs);  

    if(!args[0])
      return send('Use \"stafflogs set\"!');
    
    if(args[0]==='set')
      if(!stafflogs)
      stafflogs = await guild.createChannel('staff-logs', 'text')
       .then(reply => send(stafflogs + ' channel succesfully created!'));

  }
}
