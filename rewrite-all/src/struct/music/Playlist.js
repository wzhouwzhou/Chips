'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

//const { Song } = require('./Song');

const Playlist = class Playlist extends Array {
  constructor(songList, owner){
    super(0);
    songList.forEach(song=>this.push(song));
    this.owner = owner;
  }

  addSong (song, location) {
    this.push(song)
  }

  get size () {
    return this.length;
  }

  get shuffled () {
    return this.shuffle();
  }

  shuffle () {
    for(
      let i = this.length;
      i;
    ){
      const r = _.random(0,i-1);
      const temp = this[--i];
      this[i] = this[r];
      this[r] = temp;
    }
    return this;
  }
};

exports.Playlist = Playlist;
