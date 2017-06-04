const botPrefixes = ['.', '-','+','t!','t@'];
const botPrefixesRegex = new Array(botPrefixes.length);
botPrefixes.forEach(pre=>{
  let reg = new RegExp('^'+pre);
  botPrefixesRegex.push(reg);
});
module.exports = {
  name: "botclear",
  perm: ["server.clear"],
  customperm: ["MANAGE_MESSAGES"],
  async func(msg, { reply, channel, args }) {
    let nummsgs = 0;
    let limit = args[0]&&(!isNaN(args[0]))?parseInt(args[0]):5;

    channel.fetchMessages({limit: limit}).then(msgs =>
      msgs.filter(m=>{
        const isMatch = botPrefixesRegex.some(rx => (rx.exec(text).index==0));
        return m.author.bot||isMatch;
      })
    ).then(msgs=>{
      nummsgs = msgs.size;
      channel.bulkDelete(msgs);
      reply(`Deleted ${nummsgs} bot-related messages in the last ${limit} messages sent here!`);
    }).catch(err=>{
      console.log('[Clear] '+ err);
      reply(`Could not delete ${nummsgs} bot-related messages, perhaps I am missing permissions?`);
    });
  }
};
