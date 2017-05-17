
const whitelist = [
	Constants.users.WILLYZ,
	Constants.users.XZLQ,
	Constants.users.PGSUPER,
	Constants.users.NELYN,
	Constants.users.Tarik,
	Constants.users.EVILDEATHPRO
];

module.exports = {
	name:'eval',
	async func(msg, { send, member, author, content, channel, doEval }) {
		if (whitelist.indexOf(author.id) < 0) return console.log("prohibited access to eval");

		let result = await send("Evaluating...");
		try {
			let evaled = await doEval(content.slice('-eval '.length));
			let r = (typeof evaled !== "string") ? require("util").inspect(evaled): evaled;
  		await result.edit(r);
		} catch (err) {
  		await result.edit(err);
		}
	}
};
