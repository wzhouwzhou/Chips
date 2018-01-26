const childProcess = require('child_process');
const { spawn } = childProcess;
const cb = '```';
const inrepl = new Map;
const path = require('path');
module.exports = {
  name: 'pyrepl',
  async func(msg, { send, author, channel }) {
    const sp = spawn(`/usr/bin/python3 -i ${path.join(process.cwd(), 'test.py')}`);
    let mcol;
    if (inrepl.has(channel.id)) return send('A pyrepl session is in progress');
    inrepl.set(channel.id, true);
    sp.stdin.setEncoding('utf-8');
    const mcol_filter = m => {
      if (m.author.id === author.id && m.content.startsWith(cb) && m.content.endsWith(cb)) {
        const input = m.content.substr(0, 1950).replace(new RegExp(`^${cb}`), '').replace(new RegExp(`${cb}$`), '');
        console.log(`PyREPL Input \n${input}`);
        send(`PyREPL Input ${cb}\n${input}${cb}\r\n`);
        StringStream(`${input}\n`).pipe(sp.stdin, { end: !1 });
        return true;
      }
      return false;
    };

    const handleExit = code => {
      mcol.stop();
      inrepl.delete(channel.id);
      return send(`Exit code: ${cb}${`${code}`.substr(0, 1950)}${cb}`);
    };
    sp.stdout.on('data', data => send(`stdout: ${cb}py\n${`${data}`.substr(0, 1950)}${cb}`));
    sp.stderr.on('data', data => send(`stderr: ${cb}py\n${`${data}`.substr(0, 1950)}${cb}`));
    sp.on('close', handleExit);
    sp.on('error', err => send(`Process Error: ${cb}\n${`${err}`.substr(0, 1950)}${cb}`));
    sp.on('disconnect', handleExit);
    send('Starting repl...');

    mcol = channel.createMessageCollector(
      mcol_filter,
      { time: 5 * 60 * 1000 }
    );
    mcol.on('end', () => send('Pyrepl mcol ended'));
    return mcol;
  },
};

var inherits = require('util').inherits
var stream = require('readable-stream')

inherits(StringStream, stream.Readable)

function StringStream (str) {
  if (!(this instanceof StringStream)) return new StringStream(str)
  stream.Readable.call(this)
  this._str = str
}

StringStream.prototype._read = function () {
  if (!this.ended) {
    var self = this
    process.nextTick(function () {
      self.push(new Buffer(self._str))
      self.push(null)
    })
    this.ended = true
  }
}
