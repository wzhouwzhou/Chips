let flags;
const times = [30,17,5], difficulties = ['easy','medium','hard'], check = '✅';

module.exports = {
  name: "trivia",
  async func(msg, { send, reply, author, args, channel }) {
    if(!args) return;
    if(args[0] === 'flags') {
      if(!flags)
        flags = Object.entries(JSON.parse(await Promise.resolve(require('snekfetch').get('https://raw.githubusercontent.com/hjnilsson/country-flags/master/countries.json').then(r=>r.body)))).map(e=>[e[1], `https://raw.githubusercontent.com/hjnilsson/country-flags/master/png1000px/${e[0].toLowerCase()}.png`]);

      const random = _.sample(flags);
      let difficulty = args[1]&&difficulties.indexOf(args[1])?args[1].toLowerCase():'medium';
      let time = times[difficulties.indexOf(difficulty.toLowerCase())];
      let beginm = await send(`The difficulty level is \`${difficulty}\`You will have ${time} seconds to answer. React with ${check} to start`);

      try {
        await beginm.awaitReactions ((r, u) => u.id === author.id&&reaction.emoji+[] === check, { errors: ['time'] });
      } catch(err) {
        return reply('Timed out');
      }
      let answeredOnce = false, mCol, win;
      const filter = m => {
        if(new RegExp(`${_.escapeRegExp(random[0].replace(/\s+/,''))}`,'i').test(m.content.replace(/\s+/,''))) {
          answeredOnce = true;
          mCol&&mCol.stop();
          win = m.author;
        }
      };
      send(new Discord.RichEmbed().setTitle('Flag trivia').setDescription('Guess the country!').setImage(random[1]));
      mCol = channel.createMessageCollector(
        filter,
        { time: time+1000 }
      );
      mCol.on('end', collected => {
        if(!answeredOnce||!collected.first()||!win) return send(`The answer was ${random[0]}`);
        else return send(`${win+[]} got it! The answer was ${random[0]}`);
      });
    }
  }
};
