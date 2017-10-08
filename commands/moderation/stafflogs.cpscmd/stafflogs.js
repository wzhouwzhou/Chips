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
      stafflogs = await guild.createChannel(
        { name: 'staff-logs'}
      ).then(reply => send(stafflogs + ' channel succesfully created!'));

    if (args[0]==='add')
     return send('Creating a staff-logs channel.')
      .then (channel => channel.create('staff-logs'))
      await send(stafflogs + ' channel succesfully created!');
}

/*    
Inspired by uhm emojiben

const mem = gMember(target);

    let ebanRole=guild.roles.find("name","Emoji Banned");
    if (ebanRole==null)
      ebanRole= await guild.createRole(
        { name: 'Emoji Banned'}
      );

    if(ebanRole==null)console.log("Error getting emoji banned role");

    const channels = guild.channels.filter(c => c.type === 'text');
    if(channels==null)console.log("Error getting text channels");
    for (const channel of channels.values())
      await channel.overwritePermissions(ebanRole, {
        USE_EXTERNAL_EMOJIS: false,
        ADD_REACTIONS: false,
      });

    mem.addRole(ebanRole);

    const usernm = mem.user.username;

    await reply(`User ${usernm} emoji banned successfully!`);

    let emb = new Discord.RichEmbed()
      .setAuthor("Emoji Ban Log")
      .setTitle(`<@${mem.user.id}> was emoji banned by <@${author.id}>`)
      .setColor(9109504)
      .setThumbnail(Constants.images.WARNING)
      .addField("Emoji Ban reason: ", `${reason}`, true);
    await send(emb);
  }
};*/
