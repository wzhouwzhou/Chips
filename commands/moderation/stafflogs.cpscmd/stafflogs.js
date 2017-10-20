module.exports = {
  name: "stafflogs",
  async func(msg, { channel, args, guild, send, member }) {
    
    if(!guild)
      return;
    
    let stafflogs = guild.channels.find('name', 'staff-logs');
    
    if(!member.hasPermission("MANAGE_CHANNELS"))
      return send('You need `MANAGE_CHANNELS` permissions to use this command!')
    
    if(stafflogs) 
      return send('You already have a staff-logs channel: ' + stafflogs);  

    let logs;
       try {
         logs = await guild.createChannel('staff-logs', 'text');
         await guild.channels.find('name', 'staff-logs').overwritePermissions(guild.roles.find('name', '@everyone'), 
        {
          "SEND_MESSAGES": false,
          "ADD_REACTIONS": false
        });
         send(`Created new channel with name ${logs.name}!`);
       }catch(err){
         send('The channel could not be created…');
         throw err;
       }   

  }
}
