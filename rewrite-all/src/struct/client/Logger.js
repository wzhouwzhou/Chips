const logmodes = [
  'production',
  'info'
];

class Logger {
  constructor( logLevel = 'verbose', prefix = '' ){
    this.logLevel = logLevel;
    this.prefix = prefix;
  }

  log(type='info', msgmodule='main', logcategory, msg){
    msgmodule = chalk.bgBlack.bold(`[${msgmodule}]`);
    let time = chalk.cyan(`[${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}]:`);
    logcategory = chalk.underline.blue(`[${logcategory}]`);

    switch(type.toLowerCase()){
      case 'error':
        msg=chalk.bold.bgRed(msg);
        break;
      default:
        type = chalk.bold.bgBlue(`[${type}]`);
    }
    time=prefix||''+time;
    console.log(time, type, msgmodule, logcategory, msg);
  }
}

Logger.default = new Logger();

module.exports = Logger;
