let flags;
const times = [30,17,5], difficulties = ['easy','medium','hard'], check = '✅';

module.exports = {
  name: "trivia",
  async func(msg, { send, reply, author, args, channel, client }) {
    if(!args) return;
    if(args[0] === 'flags') {
      if(!flags)
        flags = Object.entries(JSON.parse(await Promise.resolve(require('snekfetch').get('https://raw.githubusercontent.com/hjnilsson/country-flags/master/countries.json').then(r=>r.body)))).map(e=>[e[1], `https://raw.githubusercontent.com/hjnilsson/country-flags/master/png1000px/${e[0].toLowerCase()}.png`]);

      const random = _.sample(flags);
      let difficulty = args[1]&&difficulties.indexOf(args[1])?args[1].toLowerCase():'medium';
      let time = times[difficulties.indexOf(difficulty.toLowerCase())];
      let beginm = await send(`The difficulty level is \`${difficulty}\`, so you will have **${time} seconds** to answer the question. React with ${check} to start`);
      beginm.react(check);
      try {
        await beginm.awaitReactions ((r, u) => u.id === author.id&&r.emoji.name === check, { max: 1, time: 10000, errors: ['time'] });
      } catch(err) {
        return reply('Timed out');
      }
      let answeredOnce = false, mCol, win;
      const filter = m => {
        if(m.author.id === client.user.id) return false;

        if(new RegExp(`${_.escapeRegExp(m.content.replace(/[\s.\-,]+/,''))}`,'i').test(_.escapeRegExp(random[0].replace(/[\s.\-,]+/,'')))) {
          answeredOnce = true;
          mCol&&mCol.stop();
          win = m.author;
          return true;
        }
        return false;
      };
      send(new Discord.RichEmbed().setTitle('Flag trivia').setDescription('Guess the country!').setImage(random[1]));
      mCol = channel.createMessageCollector(
        filter,
        { time: 1000*(time+1), maxMatches: 1 }
      );
      mCol.on('end', collected => {
        if(!answeredOnce||!collected.first()||!win) return send(`The answer was ${random[0]}`);
        else return send(`${win+[]} got it! The answer was ${random[0]}`);
      });
    }
  }
};
