const rps = a=>b=>a==b?0:!(a+b)[12]^a>b||-1
const choices = ['rock','paper','scissors'];
const reg = new RegExp(`${choices.map(e=>_.escapeRegExp(e)).join('|')}`,'i');

module.exports = {
  name: "rockpaperscissors",
  async func(msg, { send, channel, author }) {
    let user, computer = _.sample(choices);
    const filter = m => {
      if(m.author.id !== author.id) return false;
      const cont = _.escapeRegExp(m.content.replace(/[\s.\-,]+/,''));
      if(reg.test(cont)) {
        user = cont.match(reg)[0];
        m.delete();
        mCol&&mCol.stop();
        return true;
      }
      return false;
    };
    let sentMsg = await send(new Discord.RichEmbed().setTitle('Rock Paper Scissors').setDescription('Choose Rock, Paper, or Scissors!'));
    mCol = channel.createMessageCollector(
      filter,
      { time: 5000, maxMatches: 1 }
    );
    mCol.on('end', collected => {
      if(!user&&!collected.first()) return send('Timed out');
      else {
        const result = (() => {
          switch(rps(user.toLowerCase())(computer)){
            case 0: return ('It was a tie!');
            case 1: return ('You won!');
            case -1:return ('The computer won!');
          }
        })();
        sentMsg.edit(result, new Discord.RichEmbed().setTitle('Rock Paper Scissors').setDescription(`The computer went ${computer}`));
      }
    });
  }
};
