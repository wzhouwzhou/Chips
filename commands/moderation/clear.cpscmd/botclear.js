module.exports = {
  name: "stats",
  perm: ["global.stats"],
  async func(msg, { reply, channel, args }) {
    let nummsgs = 0;
    let limit = args[0]&&(!isNaN(args[0]))?parseInt(args[0]):5;
    
    channel.fetchMessages({limit: limit}).then(msgs =>
      msgs.filter(m=>{
        return m.author.bot||/^(.|-|t!|'|->|")]/.test(m.content);
      })
    ).then(msgs=>{
      nummsgs = msgs.size;
      channel.bulkDelete(msgs);
      reply(`Deleted ${nummsgs} bot-related messages in the last ${limit} messages sent here!`);
    });
  }
};
