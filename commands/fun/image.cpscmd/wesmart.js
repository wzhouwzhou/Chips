const wesmart = 'https://cdn.discordapp.com/attachments/288802426905952258/456984571196473354/wesmart.gif';
exports.name = 'wesmart';
exports.func = (msg, { send, Discord }) => send(new Discord.MessageAttachment(wesmart, 'wesmart.gif'));
