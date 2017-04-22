
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
			let evaled = eval(content.slice('-eval '.length));
			if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
			channel.sendCode("xl", evaled).catch(console.error);
		}
		catch(err) {
			channel.sendCode("xl", err.toString()).catch(console.error);
		}
	}
}
