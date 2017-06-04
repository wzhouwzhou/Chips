const async = require('async');
const botPrefixes = ['.', '-','+','t!','t@'];

module.exports = {
  name: "botclear",
  perm: ["server.clear"],
  customperm: ["MANAGE_MESSAGES"],
  async func(msg, { reply, channel, args }) {
    let nummsgs = 0;
    let limit = args[0]&&(!isNaN(args[0]))?parseInt(args[0]):25;

    channel.fetchMessages({limit: limit}).then(msgs => {
      msgs.filter(m=>{
        if(m.author.bot) return true;
        botPrefixes.forEach(pre=>{
          return ((m,pre)=>{return(m.content.toLowerCase().startsWith(pre));})(m,pre);
        });
      });
    }).then(msgs=>{
      if(!msgs||msgs.size==0) return reply(`There were 0 bot-related messages in the last ${limit} messages!`);
      nummsgs = msgs.size;
      channel.bulkDelete(msgs);
      reply(`Deleted ${nummsgs} bot-related messages in the last ${limit} messages sent here!`);
    }).catch(err=>{
      console.log('[Clear] '+ err);
      reply(`Could not delete ${nummsgs} bot-related messages, perhaps I am missing permissions?`);
    });
  }
};
