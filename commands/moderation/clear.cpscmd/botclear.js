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
  'ay!',
  '-',
  'a-',
  'b-',
  'c-',
  '$',
  'cm!'
];

module.exports = {
  name: 'botclear',
  async func(msg, { reply, channel, args }) {
    let nummsgs = 0;
    let limit = args[0] && !isNaN(args[0]) ? parseInt(args[0]) : 25;

    channel.messages.fetch({ limit }).then(msgs => {
      msgs = msgs.filter(m => {
        if (m.author.bot) return true;
        let matched = false;
        for (pre of botPrefixes) {
          matched = m.content.toLowerCase().startsWith(pre) ? true : matched;
          if (matched) return true;
        }
        return false;
      });

      if (!msgs || msgs.size == 0) return reply(`There were 0 bot-related messages in the last ${limit} messages!`);
      nummsgs = msgs.size;
      channel.bulkDelete(msgs);
      reply(`Deleted ${nummsgs} bot-related messages in the last ${limit} messages sent here!`).then(sentmsg =>
        setTimeout(() => { sentmsg.delete(); }, 5000));
    }).catch(err => {
      console.log(`[Clear] ${err}`);
      reply(`Could not delete ${nummsgs} bot-related messages, perhaps I am missing permissions?`).then(sentmsg =>
        setTimeout(() => { sentmsg.delete(); }, 5000));
    });
  },
};
