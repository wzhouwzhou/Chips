const childProcess = require('child_process');
const { spawn } = childProcess;
const cb = '```';
module.exports = {
  name: 'pyrepl',
  func(msg, { send, author, channel }) {
    const sp = spawn('python3', []);
    let mcol;
    const mcol_filter = m => {
      if (m.author.id === author.id && m.content.startsWith(cb) && m.content.endsWith(cb)) {
        send(`PyREPL Input ${cb}\n${m.content.substr(0, 1950)}${cb}`);
        sp.stdin.write(m.content(0, 1950));
        return true;
      }
      return false;
    };

    const handleExit = code => {
      mcol.stop();
      return send(`Exit code: ${cb}${code.substr(0, 1950)}${cb}`);
    };
    sp.stdout.on('data', data => send(`stdout: ${cb}py\n${data.substr(0, 1950)}${cb}`));
    sp.stderr.on('data', data => send(`stderr: ${cb}py\n${data.substr(0, 1950)}${cb}`));
    sp.on('close', handleExit.bind(this));
    sp.on('error', err => send(`Process Error: ${cb}\n${err.substr(0, 1950)}${cb}`));

    send('Starting repl...');

    mcol = channel.createMessageCollector(
      mcol_filter,
      { time: 5 * 60 * 1000 }
    );
    return mcol;
  },
};
