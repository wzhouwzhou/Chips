
const botPrefixes = [
  '.',
  'do.',
  'r.',
  '-',
  '--',
  '+',
  '++',
  '!',
  '$$',
  '&&',
  '!!',
  'a!',
  'b!',
  'c!',
  'd!',
  'e!',
  'f!',
  'g!',
  'h!',
  'i!',
  'j!',
  'k!',
  'l!',
  'm!',
  'n!',
  'o!',
  'p!',
  'q!',
  'r!',
  's!',
  't!',
  'u!',
  'v!',
  'w!',
  'x!',
  'y!',
  'z!',
  't@',
  'n!',
  '/',
  '//',
  '\\',
  '=',
  ';',
  '>',
  '!',
  '->',
  '`',
  ',',
  '|',
  '[',
  ']',
  '?',
  '-',
];

module.exports = {
  name: "botclear",
  async func(msg, { reply, channel, args }) {
    const used = member || author;
    if(!used.hasPermission("MANAGE_MESSAGES")){
      switch (used.id) {
        case Constants.users.WILLYZ:
        case Constants.users.EVILDEATHPRO:
        case Constants.users.PGSUPER:
        case Constants.users.ZALGO:
        case Constants.users.XZLQ:
        case Constants.users.KONEKO:
        case Constants.users.NELYN:
        case Constants.users.LOAF:
        case Constants.users.ARX:
        case Constants.users.LUCAS:
          break;
        default:
          return reply('You must have ``MANAGE_MESSAGES`` perms to use this command!');
      }
    }
    
    let nummsgs = 0;
    let limit = args[0]&&(!isNaN(args[0]))?parseInt(args[0]):25;

    channel.messages.fetch({limit}).then(msgs => {
      msgs=msgs.filter(m=>{
        if(m.author.bot) return true;
        let matched = false;
        for(pre of botPrefixes){
          matched = m.content.toLowerCase().startsWith(pre)?true:matched;
          if(matched) return true;
        }
        return false;
      });

      if(!msgs||msgs.size==0) return reply(`There were 0 bot-related messages in the last ${limit} messages!`);
      nummsgs = msgs.size;
      channel.bulkDelete(msgs);
      reply(`Deleted ${nummsgs} bot-related messages in the last ${limit} messages sent here!`).then(sentmsg=>
        setTimeout(()=>{sentmsg.delete();},5000));
    }).catch(err=>{
      console.log('[Clear] '+ err);
      reply(`Could not delete ${nummsgs} bot-related messages, perhaps I am missing permissions?`).then(sentmsg=>
        setTimeout(()=>{sentmsg.delete();},5000));
    });
  }
};
