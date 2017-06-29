const childProcess = require('child_process');
const cb = '```';
module.exports = {
  name: "python",
  async func(msg, { reply }) {
    let output = await new Promise( (res, rej) =>
      childProcess.exec(`python3 -c '${args.join(' ')}'`, (err, sout, serr) => {
        return (err || serr)? rej(err || serr):res(sout);
      })
    );
    return reply(cb+output+cb);
  }
};
