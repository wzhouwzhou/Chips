const Searcher = require(path.join(__dirname, '../../../handlers/Searcher')).default;

module.exports = {
  name: "chipsmutebuild",
  async func(msg, { send, channel, guild, reply }) {

    let options = { guild: guild };
    searchers[guild.id] = new Searcher( options.guild );
    const list = searchers[guild.id].searchRole("Chips Muted");
    
    
    if(list.length>1) 
    return await reply(`There are too many Chips mute roles to use this command!`);


    if(list.length==1) 
    return await reply(`There's already a mute role!`);


    else if(list.length<1)
    send("Creating Mute Role...").then(m => setTimeout(()=>m.delete(800)),5000);

    guild.createRole({ 
    name: 'Chips Muted',
    postion: '',
    color: 'GREY',
    });
    
    await send("Mute role created. Editing permissions for mute role...").then(m => setTimeout(()=>m.delete(800)),5000);
    
    await guild.channels.forEach(channel => channel.overwritePermissions(guild.roles.find("name", "Chips Muted"),
    {
    "SEND_MESSAGES": false,
    "ADD_REACTIONS": false,
    "SPEAK": false
    }));

    return await send("Chips Mute role created!");
  }
};
