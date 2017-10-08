module.exports = {
  name: "stafflogs",
  async func(msg, { channel, args, guild, send }) {
    
    let stafflogs = guild.channels.find('name', 'staff-logs');
    
    if(stafflogs) 
      return send('You already have a staff-logs channel: ' + stafflogs);  

    if(!args[0])
      return send('Use \"stafflogs set\"!');
    
    if(args[0]==='set')
      if(stafflogs==null)
      stafflogs = await guild.createChannel('staff-logs', 'text')
       .then(reply => send(stafflogs + ' channel succesfully created!'));

    if (args[0]==='add')
     return send('Creating a staff-logs channel.')
     channel.create('staff-logs')
     await send(stafflogs + ' channel succesfully created!');
  }
}
