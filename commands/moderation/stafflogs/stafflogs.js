module.exports = {
  name: "stafflogs",
  async func(msg, { reply, channel, args, guild }) {

    let stafflogs = guild.channels.find('name', 'staff-logs');
    if(stafflogs) 
      return send('You already have a staff-logs channel: ' + stafflogs)   

    if(!args[0])
      return send('Use \"stafflogs set\"!')
    
    if(args[0]==='set')
    
    if(!stafflogs)
     return send('Creating a staff-logs channel!');
    
    guild.createChannel('staff-logs', 'text')
       .then(channel => console.log(`Created new channel ${channel}`))
        .catch(console.error);
    send('Staff-logs created!');
    

    }

  } 
  