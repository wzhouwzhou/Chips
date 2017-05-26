/* eslint no-unused-vars: "off" */

const whitelist = [
	Constants.users.WILLYZ,
	Constants.users.XZLQ,
	Constants.users.PGSUPER,
	Constants.users.EVILDEATHPRO
];

const util = require('util');

const ex = {
	name:'async',
	async func(msg, { args, send, author, content, doEval }) {
    if (whitelist.indexOf(author.id) < 0) return console.log("prohibited access to eval");
		let query = content.substring((prefix+ex.name+' ').length);

    const evaled = {};

    const tokenRegex = new RegExp(client.token.replace(/\./g, '\\.').split('').join('.?'), 'g');

    const result = new Promise(resolve => resolve(eval(`(async () => { ${query} })()`)));
    const cb = '```';
		let message = await send("Evaluating...");
    return result.then(output => {
        if (typeof output !== 'string') output = util.inspect(output);
        output = `${!output || output === 'undefined' ? '' : output}`;
        output = output.replace(tokenRegex, '[TOKEN]');

        if (output.length > 1900) output = 'Output too long.';

        return message.edit(`📥\u2000**Input**${cb}js\n${query}\n${cb}\n📤\u2000**Output**${cb}js\n${output}\n${cb}`).then(() => {
            evaled.errored = false;
            evaled.output = output;
        });
    }).catch(err => {
        console.log('Async errored.');
        console.error(err);

        err = err.toString();
        err = `${!err||err === 'undefined' ? '' : err}`;
        err = err.replace(tokenRegex, '[TOKEN]');

        return message.edit(`📥\u2000**Input**${cb}js\n${query}\n${cb}\n☠\u2000**Error**${cb}js\n${err}\n${cb}`).then(() => {
            evaled.errored = true;
            evaled.output = err;
        });
    });
	}
};

module.exports = ex;
