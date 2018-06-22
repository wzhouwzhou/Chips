module.exports = {
  name: 's',
  func(msg, { send, reply, author, suffix, Constants }) {
    if (suffix === '') return reply('Please include a message for the bot to repeat');
    msg.delete().catch(_ => _);
    return send(suffix, { disableEveryone: true });
  },
};
