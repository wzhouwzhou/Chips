/* eslint no-console: 'off', func-names: 'off' */
Object.defineProperty(exports, '__esModule', { value: true });
const colors = require('chalk');
const moment = require('moment');
function editConsole(isMng, shardIDObj) {
  console.oldLog = console.log;
  const timers = {
    log: new Date,
    err: new Date,
  };
  console.log = (...args) => {
    let time = colors.cyan(`[${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}] | `);

    if (!!`${args[0] + []}`.match(/\[CPSCMD\]/i) ||
    !!`${args[0] + []}`.match(/\[COMMAND LOADER\](?!\[Err\])\s*(?:(?:File)|(?:Load(?:ing|ed)\s(?!\d+)))/i)) {
      return undefined;
    }
    args.unshift(`${colors.bgYellow.bold(isMng ? `[MNG]` : `[S${'id' in shardIDObj ? shardIDObj.id : '?'}]`)} `);
    let logdif = colors.bold.bgBlue(` +${new Date - timers.log} ms`);
    timers.log = new Date;
    return console.oldLog.apply({}, [time, ...args, logdif]);
  };
  console.oldError = console.error;
  console.error = function() {
    let time = colors.cyan(`[${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}] | `);
    const args = Array.from(arguments);
    args.unshift(`${colors.bgYellow.bold(isMng ? `[MNG]` : `[S${shardIDObj.id == null ? '?' : shardIDObj.id}]`)} `);
    let errdif = colors.bold.bgBlue(` +${new Date - timers.err} ms`);
    timers.err = new Date;
    return console.oldError.apply({}, [time, ...args, errdif]);
  };
  colors.enabled = true;
}
exports.default = editConsole;
