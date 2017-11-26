module.exports = {
    name: 'setnick',
    async func(msg, { send, guild, member, author, args, content }) {
      
    if(author.id == '205608598233939970')  
      if(!args[0]) {
        return send('Name? Mention?')
      }
      if(!args[1]) {
        return send('Name?')
      }
      if(args[0].match(/^[^]*<@!?(\d+)>[^]*$/) && args[1]) {
        let targetUser = msg.mentions.members.first() 
        let targetName = content.substring(content.indexOf(args[1]));
        await targetUser.setNickname(`${targetName}`);
        return send(`Gucci.`);

      }   
  },
};
