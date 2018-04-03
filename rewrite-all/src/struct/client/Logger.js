'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

/* Const logmodes = [
  'production',
  'info'
];*/

const moment = require('moment');
const chalk = require('chalk');
chalk.enabled = true;

class Logger {
  constructor(mmodule = 'main', category = 'chips.js', logLevel = 'verbose', prefix = '') {
    this.msgmodule = mmodule;
    this.category = category;
    this.logLevel = logLevel;
    this.prefix = prefix;
  }

  log(logstuff) {
    let stuff = Object.assign({},
      { type: 'info', msgmodule: this.msgmodule, logcategory: this.category, msg: 'none' },
      logstuff
    );

    let { type, msgmodule, logcategory, msg } = stuff;

    msgmodule = chalk.bgBlack.bold(`[${msgmodule}]`);

    logcategory = chalk.underline.blue(`[${logcategory}]`);

    switch (type.toLowerCase()) {
      case 'error':
        msg = chalk.bold.bgRed(msg);
        type = chalk.bold.bgRed(`[${type}]`);
        break;
      default:
        type = chalk.bold.bgBlue(`[${type}]`);
    }

    console.log(this.prefix || '', type, msgmodule, logcategory, msg);
  }

  error(logstuff) {
    return this.log(Object.assign({},
      { type: 'error' },
      { msg: logstuff }
    ));
  }

  info(logstuff) {
    return this.log(Object.assign({},
      { type: 'info' },
      { msg: logstuff }
    ));
  }

  debug(logstuff) {
    return this.log(Object.assign({},
      { type: 'debug' },
      { msg: logstuff }
    ));
  }
}

Logger.default = new Logger();
exports.create = (mmodule, category, logLevel, prefix) => new Logger(mmodule, category, logLevel, prefix);
exports.Logger = Logger;
