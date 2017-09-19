module.exports = {
  name: "lmgtfy",
  async func(msg, { send, prefix, args }) {
    if (!args[0]) {
        return reply('Heres how you can use this command:\n**${_.escapeRegExp(prefix)}** google [message content]\n**${_.escapeRegExp(prefix)}** bing [message content]\n**${_.escapeRegExp(prefix)}** yahoo [message content]\n**${_.escapeRegExp(prefix)}** aol [message content]\n**${_.escapeRegExp(prefix)}** ask [message content]\n**${_.escapeRegExp(prefix)}** duck [message content]');
    }
	if (args[0]=="google") {
    return reply(`Heres how you google this! http://www.lmgtfy.com/?q=${message.content.split(/\s+/).slice(2).join('+')}`);
	}
	if (args[0]=="bing") {
    return reply(`Heres how you search this! http://www.lmgtfy.com/?s=b&iie=1&q=${message.content.split(/\s+/).slice(2).join('+')}`);
	}
	if (args[0]=="yahoo") {
    return reply(`Heres how you search this! http://www.lmgtfy.com/?s=y&iie=1&q=${message.content.split(/\s+/).slice(2).join('+')}`);
	}
	if (args[0]=="aol") {
    return reply(`Heres how you search this! http://www.lmgtfy.com/?s=a&iie=1&q=${message.content.split(/\s+/).slice(2).join('+')}`);
	}
	if (args[0]=="ask") {
    return reply(`Heres how you search this! http://www.lmgtfy.com/?s=k&iie=1&q=${message.content.split(/\s+/).slice(2).join('+')}`);
	}
	if (args[0]=="duck") {
    return reply(`Heres how you search this! http://www.lmgtfy.com/?s=d&iie=1&q=${message.content.split(/\s+/).slice(2).join('+')}`);
	} 
  }};
