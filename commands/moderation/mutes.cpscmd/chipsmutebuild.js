const Searcher = require(path.join(__dirname, '../../../handlers/Searcher')).default;

module.exports = {
  name: 'chipsmutebuild',
  async func(msg, { send, guild, reply, author }) {
    if(!guild) return send('You must be in a server to use this');
    searchers[guild.id] = new Searcher( guild );
    let list = searchers[guild.id].searchRole('Chips Muted');


    if(list.length>1)
    return await reply(`There are too many Chips mute roles to use this command!`);


    if(list.length>=1)
    return await reply(`There's already a mute role!`);


    else if(list.length<1)
    send('Creating Mute Role...').then(m => setTimeout(()=>m.delete({timeout: 800})),5000);

    r = await (await guild.createRole({
      name: 'Chips Muted',
      postion: '',
      color: 'GREY',
      reason: 'Chipsmutebuild executed by '+author.tag,
    })).edit({
      name: 'Chips Muted',
      postion: '',
      color: 'GREY',
    });

    list = searchers[guild.id].searchRole('Chips Muted');

    await send('Mute role created. Editing permissions for mute role...').then(m => setTimeout(()=>m.delete({timeout: 800})),5000);

    await guild.channels.forEach(channel => channel.overwritePermissions(list[0],
    {
      'SEND_MESSAGES': false,
      'MANAGE_MESSAGES': false,
      'ADD_REACTIONS': false,
      'SPEAK': false,
    }));

    return await send('Chips Mute role created!');
  }
};
