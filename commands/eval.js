
const whitelist = [
	Constants.users.WILLYZ,
	Constants.users.XZLQ,
	Constants.users.PGSUPER,
	Constants.users.EVILDEATHPRO
];

const tokenRegex = new RegExp(client.token.replace(/\./g, '\\.').split('').join('.?'), 'g');
const token2Regex = new RegExp(h3client.token.replace(/\./g, '\\.').split('').join('.?'), 'g');

module.exports = {
	name:'eval',
	async func(msg, { send, author, content, doEval }) {
		if (whitelist.indexOf(author.id) < 0) return console.log("Prohibited access to eval.");

		let result = await send("Evaluating...");
		let start = process.hrtime();

		try {
			let evaled = await doEval(content.slice('-eval '.length));
			let r = (typeof evaled !== "string") ? require("util").inspect(evaled): evaled;
			let hrTime = process.hrtime(start);
			let µs = false;
			end = (hrTime[0] * 1000 + hrTime[1] / 1000000);
			if(end<1){
				µs = true;
				end = (hrTime[0] * 1000000 + hrTime[1] / 1000);
			}
			µs ? end += 'µs' : end += 'ms';


			r = r.replace(tokenRegex, '[TOKEN]').replace(token2Regex, '[TOKEN]');

			let metrics=`\n\n--Evaluation took ${(end)}.--`;
			if (r.length + metrics.length > 1900) r = 'Output too long.';

  		await result.edit(`${r}${metrics}`);
		} catch (err) {
  		await result.edit(err);
		}
	}
};
