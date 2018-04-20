module.exports = {
  name: 'lastmessageid',
  func(msg, { send, guild, channel }) {
    if (guild) {
      let ref;
      return send(`The last msg sent in this channel has id ${
        (ref = Array.from(channel.messages.values()).reverse()[1]) ?
          ref.id :
          channel.lastMessageID
      }`);
    } else {
      return send('You must be in a server to use this!');
    }
  },
};
