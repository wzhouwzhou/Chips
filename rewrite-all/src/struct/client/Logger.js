/*const logmodes = [
  'production',
  'info'
];*/

const moment = require('moment');
const chalk = require('chalk');
chalk.enabled = true;

class Logger {
  constructor( logLevel = 'verbose', prefix = '' ){
    this.logLevel = logLevel;
    this.prefix = prefix;
  }

  log( info ){
    let stuff = Object.assign({},
      { type: 'info', msgmodule: 'main', logcategory: 'chips', msg: 'none' },
      info
    );

    let { type, msgmodule, logcategory, msg } = stuff;

    msgmodule = chalk.bgBlack.bold(`[${msgmodule}]`);

    let time = chalk.cyan(`[${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}]:`);

    logcategory = chalk.underline.blue(`[${logcategory}]`);

    switch(type.toLowerCase()){
      case 'error':
        msg=chalk.bold.bgRed(msg);
        type=chalk.bold.bgRed(`[${type}]`);
        break;
      default:
        type = chalk.bold.bgBlue(`[${type}]`);
    }

    time=(this.prefix||'')+time;
    console.log(time, type, msgmodule, logcategory, msg);
  }
}

Logger.default = new Logger();

module.exports = Logger;
