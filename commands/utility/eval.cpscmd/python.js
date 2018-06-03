const childProcess = require('child_process');
const cb = '```';
module.exports = {
  name: 'python',
  async func(msg, { reply, content, prefix, args}) {
    if (args.length < 1) return send('Nothing to eval in python.');
    let output = await new Promise(res =>
      childProcess.exec(`python3 -c "${content.substring(`${prefix}python `.length).replace(/\\n/, '\\\\n').replace(/"/g, '\\"')}"`, (err, sout, serr) => err || serr ? res(err || serr) : res(sout))
    );
    return reply(`Python eval:\n${cb}py\n${output}${cb}`);
  },
};
