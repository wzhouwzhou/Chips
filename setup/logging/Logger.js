const logmodes = [
  'production'
];

class Logger {
  constructor(logLevel = 'verbose'){
    this.logLevel = logLevel;
  }

  log(type='info', msgmodule='main', logcategory, msg){
    msgmodule = chalk.bgBlack.bold(`[${msgmodule}]`);
    let time = chalk.cyan(`[${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}]:`);
    logcategory = chalk.underline.blue(`[${logcategory}]`);
    type = chalk.bold.bgBlue(`[${type}]`);
    switch(type){
      case 'error':
        msg=chalk.bgRed(msg);
    }
    console.log(time, type, msgmodule, logcategory, msg);
  }
}

module.exports = Logger;
