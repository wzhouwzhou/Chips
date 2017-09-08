'use strict';
Object.defineProperty(exports, "__esModule", { value: true });

const rrequire = (m) => {
  try{
    if(m.match(/^[^]*%delete%[^]*$/i))
      delete require.cache[require.resolve(m.replace(/%delete%/g,''))];
    return require(m.replace(/%delete%/g,''));
  }catch(err){
    console.error(err);
    return null;
  }
};
exports.rrequire = rrequire;

const Exporter = class Exporter {
  define (temp, key, modu, options) {
    Object.defineProperty(temp, key, {
      get: (() => {
        const m = rrequire(modu);
        const de = m.default;
        if(de && (~(typeof de).indexOf('function'))) return de(options);
        return m;
      }),
      configurable: false,
    });
    return temp;
  }

  serialize(){
    const data = {
      packages: {},
      functions: {},
    };
    Object.defineProperty(data.packages, 'chalk', {
      get: (() => {
        const chalk = require('chalk');
        chalk.enabled = true;
        return chalk;
      }),
      configurable: false,
    });
    [
      ['discord.js', ['Discord', 'djs']],
      'fs',
      ['lodash',['_','lodash']],
      'path',
      'body-parser',
      'cookie-parser',
      'express',
      'express-session',
      'connect-flash',
      'morgan',
      ['rotating-file-stream', ['rfs','rotating_file_stream']],
      'crypto',
      ['ytdl-core', 'ytdl'],
      'moment',
      'ytsearcher',
      'discordblacklist',
      'pm2',
      'connect-four',
      'needle',
      'request',
      'got',
      'snekfetch',
      'child_process',
      'jimp',
      'jsonfile',
      'url-download',
      ['events', 'EventEmitter'],
      'rethinkdbdash',
      'rethinkdb',
      ['google-spreadsheet', ['google-spreadsheet','GoogleSpreadsheet']],
      'express-ejs-extend',
      'passport',
      'http-proxy',
      'asciify',
      'assert',
      'pmx',
      ['cheerio', ['cheerio','$']],
    ].forEach(m => {
      if(typeof m === 'string')
        return this.define(data['packages'], m, m);
      if(m[1] === undefined)
        return this.define(data['packages'], m[0], m[0]);
      if(typeof m[1] === 'string')
        return this.define(data['packages'], m[1], m[0]);
      m[1].forEach(k => this.define(data['packages'], k, m[0]));
    });

    [
      'mee6rankF',
      'execF',
      'lastF',
      'firstF',
      'checkNumberF',
      'collectAllF',
      'delayF',
      ['reverseF',['rs','reverse']],
      ['reverseWF',['rws','reverseW']],
      'timeAgoF',
      'grammarJoinF',
      'fetchMessagesRF',
      'massDeleteF',
      'randomCapsF',
    ].forEach(f => {
      if(typeof f === 'string')
        return this.define(data['functions'], f, f);
      if(f[1] === undefined)
        return this.define(data['functions'], f[0], f[0]);
      if(typeof f[1] === 'string')
        return this.define(data['functions'], f[1], f[0]);
      f[1].forEach(k => this.define(data['functions'], k, f[0], data.packages));
    });

    return data;
  }
};
exports.default = (new Exporter).serialize();
