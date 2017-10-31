module.exports = {
  name: 'lastmessageid',
  async func(msg, { send, guild, channel }) {
    if (guild) { return send(`The last msg sent in this channel has id ${channel.lastMessageID}`); 
  } else { return send('You must be in a server to use this!'); }
  },
};
