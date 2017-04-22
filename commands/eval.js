
const whitelist = [
	Constants.users.WILLYZ,
	Constants.users.XZLQ,
	Constants.users.PGSUPER
];

module.exports = {
	name:'eval',
	async func(msg, {send, member, author, content, channel}) {
		if (!whitelist.indexOf(author.id)>=0) return;
		try {
			var evaled = eval(m.content.slice(';eval '.length));
			if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
			m.channel.sendCode("xl", evaled).catch(console.error);
		}
		catch(err) {
			m.channel.sendCode("xl", err.toString()).catch(console.error);
		}
	}
}
