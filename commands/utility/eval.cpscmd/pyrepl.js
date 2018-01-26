const childProcess = require('child_process');
const { spawn } = childProcess;
const cb = '```';
const inrepl = new Map;
module.exports = {
  name: 'pyrepl',
  func(msg, { send, author, channel }) {
    const sp = spawn('python3', []);
    let mcol;
    if (inrepl.has(channel.id)) return send('A pyrepl session is in progress');
    inrepl.set(channel.id, true);
    const mcol_filter = m => {
      if (m.author.id === author.id && m.content.startsWith(cb) && m.content.endsWith(cb)) {
        const input = m.content.substr(0, 1950).replace(new RegExp(`^${cb}`), '').replace(new RegExp(`${cb}$`), '');
        console.log(`PyREPL Input ${cb}\n${input}${cb}`);
        send(`PyREPL Input ${cb}\n${input}${cb}\r\n`);
        sp.stdin.write(input);
        return true;
      }
      return false;
    };

    const handleExit = code => {
      mcol.stop();
      inrepl.delete(channel.id);
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
    mcol.on('end', () => send('Pyrepl mcol ended'));
    return mcol;
  },
};
