'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

/*const logmodes = [
  'production',
  'info'
];*/

const moment = require('moment');
const chalk = require('chalk');
chalk.enabled = true;

class Logger {
  constructor( mmodule = 'main', category = 'chips.js', logLevel = 'verbose', prefix = '' ){
    this.msgmodule = mmodule;
    this.logLevel = logLevel;
    this.prefix = prefix;
  }

  log( logstuff ){
    let stuff = Object.assign({},
      { type: 'info', msgmodule: this.msgmodule, logcategory: this.msgmodule, msg: 'none' },
      logstuff
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

  error ( logstuff ) {
    return this.log( Object.assign({},
      { type: 'error' },
      logstuff
    ) );
  }

  info ( logstuff ) {
    return this.log( Object.assign({},
      { type: 'info' },
      logstuff
    ) );
  }

  debug ( logstuff ) {
    return this.log( Object.assign({},
      { type: 'debug' },
      logstuff
    ) );
  }
}

Logger.default = new Logger();
Logger.create = (mmodule, category, logLevel, prefix) => {
  return new Logger(mmodule, category, logLevel, prefix);
}
exports.Logger = Logger;
