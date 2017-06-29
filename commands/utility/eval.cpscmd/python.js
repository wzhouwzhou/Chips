const childProcess = require('child_process');
const cb = '```';
module.exports = {
  name: "python",
  async func(msg, { reply, args }) {
    let output = await new Promise( (res, rej) =>
      childProcess.exec(`python3 -c "${args.join(' ').replace(/\\n/, '\\\\n').replace(/\n/g, '\\n').replace(/"/g, '\\"').replace(/'/g, '\\\'')}"`, (err, sout, serr) => {
        return (err || serr)? rej(err || serr):res(sout);
      })
    );
    return reply('Python eval:\n'+cb+output+cb);
  }
};
