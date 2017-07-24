'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const moment = require('moment');
const ytdl = require('ytdl-core');

const Song = class Song {
  constructor ( url, DJ ) {
    if(!this.url) throw new Error('No url specified');
    this.url = url;
    this.dj = DJ;
    this.ready = false;
    ytdl.getInfo(this.url).then(info=>{
      this.info = info;
      if(info.length_seconds){
        const tempdata = moment.duration(info.length_seconds,'seconds')._data;
        const lengths = Object.values( tempdata );
        const keys = Object.keys( tempdata );

        for(i in arr)
          lengths[i]+=keys[i].substring(0,1);
        this.length = (_.drop(lengths)).reverse().splice(2).join(' ');
        if(this.length.match(/^0/)) this.length = this.length.substring( time.match(/\d+h/i).index);
      }
    });
  }

  get stream () {
    return ytdl(this.url);
  }
};

exports.Song = Song;
