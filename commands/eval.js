
const whitelist = [
	Constants.users.WILLYZ,
	Constants.users.XZLQ,
	Constants.users.PGSUPER
];

module.exports = {
	name:'eval',
	async func(msg, { send, member, author, content, channel, doEval }) {
		if (whitelist.indexOf(author.id) < 0) return console.log("prohibited access to eval");

		let result = await send("Evaluating...");
		try {
			let evaled = doEval(content.slice('-eval '.length));
			let r = (typeof evaled !== "string") ? require("util").inspect(evaled): evaled;
  		result.edit(r);
		} catch (err) {
  		result.edit(err);
		}
	}
};
