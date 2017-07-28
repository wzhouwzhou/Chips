'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const moment = require('moment');
const ytdl = require('ytdl-core');

const Song = class Song {
  constructor ( url, DJ ) {
    if(!url) throw new Error('No url specified');
    this.url = url;
    this.dj = DJ;
    this.ready = false;
  }

  loadInfo () {
    return new Promise( (res,rej) => {
      ytdl.getInfo(this.url).then(info=>{
        this._info = info;
        this.title = this._info.title||'No title';
        this.name = this.title;
        this.description = this._info.description||'No description';
        this.relatedVideos = this._info.relatedVideos;
        this.viewcount = this._info.viewcount||0;
        this.keywords = this._info.keywords||'No keywords';
        this.image = this._info.iurlmaxres||'http://logok.org/wp-content/uploads/2014/08/YouTube_logo.png';
        this.author = this._info.author||'Unknown Author';
        this.authorname = this.author&&this.author.name;
        this.publishedTime = +this._info.published||0;
        this.publishedAt = moment(+this.publishedTime);
        this.livestream = this._info.livestream;
        if(this._info.length_seconds){
          const tempdata = moment.duration(+this._info.length_seconds,'seconds')._data;
          const lengths = Object.values( tempdata );
          const keys = Object.keys( tempdata );

          for(const i in lengths)
            lengths[i]+=keys[i].substring(0,1);
          this._length = (_.drop(lengths)).reverse().splice(2).join(' ');
          if(this._length.match(/^0/)) this._length = this._length.substring( this._length.match(/\d+h/i).index);
        }
        this.ready = true;
        res(this);
      }).catch(rej);
    });
  }

  get stream () {
    return ytdl(this.url);
  }

  get length () {
    if(this.livestream&&this.livestream === '1') return 'Livestream';
    return this._length;
  }
};

exports.Song = Song;
