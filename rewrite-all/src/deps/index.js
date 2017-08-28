'use strict';
Object.defineProperty(exports, "__esModule", { value: true });

const rrequire = (m) => {
  try{
    delete require.cache[require.resolve(m)];
    return require(m);
  }catch(err){
    console.error(err);
    return null;
  }
};
exports.rrequire = rrequire;


const Exporter = class Exporter {
  define (temp, key, modu) {
    Object.defineProperty(temp, key, {
      get: (() => rrequire(modu)),
      configurable: false,
    });
    return temp;
  }
  serialize(){
    const data = {
      packages: {},
      functions: {},
    };
    [
      [
        'packages',
        [ // node_modules packages
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
          'chalk',
          'express-ejs-extend',
          'passport',
          'http-proxy',
          'asciify',
          'assert',
          'pmx',
          ['cheerio', ['cheerio','$']],
        ],
      ],
      [
        'functions',
        [ // functions
          'mee6rankF',
        ].map(e=>[`./functions/${e[0]}`, e[1]]),
      ],
    ].forEach(s=>{
      s[1].forEach(m => {
        if(typeof m === 'string')
          return this.define(data[s[0]], m, m);
        if(m[1] === undefined)
          return this.define(data[s[0]], m[0], m[0]);
        if(typeof m[1] === 'string')
          return this.define(data[s[0]], m[1], m[0]);
        m[1].forEach(k => this.define(data[s[0]], k, m[0]));
      });
    });

    return data;
  }
};
exports.default = (new Exporter).serialize();
