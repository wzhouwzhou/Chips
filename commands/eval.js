
const whitelist = [
	Constants.users.WILLYZ,
	Constants.users.XZLQ,
	Constants.users.PGSUPER
];

module.exports = {
	name:'eval',
	async func(msg, { send, member, author, content, channel, doEval }) {
		if (!whitelist.indexOf(author.id)>=0) return;
		let result = await send("Evaluating...");
		try {
			let evaled = doEval(content.slice('-eval '.length));
			let r = (typeof evaled !== "string") ? r = require("util").inspect(evaled): evaled;
  		result.edit(r);
		} catch (err) {
  		result.edit(err);
		}

		/*try {
			let evaled = eval(content.slice('-eval '.length));
			if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
			channel.sendCode("xl", evaled).catch(console.error);
		}
		catch(err) {
			channel.sendCode("xl", err.toString()).catch(console.error);
		}*/
	}
};
