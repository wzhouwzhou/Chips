const opinion = 'https://cdn.discordapp.com/attachments/268110005729755146/448219362193702923/received_2072165356438637.jpeg';
exports.name = 'opinion';
exports.func = (msg, { send, Discord }) => send(new Discord.MessageAttachment(opinion, 'opinion.jpeg'));
