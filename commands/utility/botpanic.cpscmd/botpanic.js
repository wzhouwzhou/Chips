module.exports = {
  name: 'botpanic',
  async func(msg, { reply, author, client }) {
    switch (author.id) {
      case Constants.users.WILLYZ:
      case Constants.users.PGSUPER:
      case Constants.users.EVILDEATHPRO:
      case Constants.users.LUCAS:
        break;
      default:
        return reply(`No!`);
    }
    client.database._sheets.botlog.addRow({ time: `${moment().format('ddd, Do of MMM @ HH:mm:ss')}`, action: 'PANIC', mainvalue: 'SIGTERM' }, err => { console.log(`Error : ${err}`); });
    // Await client.user.setStatus("idle");
    // await client.user.setGame("Restarting");
    await reply('Bot restarting!');
    // Await client.user.setStatus("invisible");
    process.exit(-100);
  },
};
