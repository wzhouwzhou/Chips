'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

// Const { Song } = require('./Song');

const Playlist = class Playlist extends Array {
  constructor(songList, owner) {
    super(0);
    songList.forEach(song => this.push(song));
    this.owner = owner;
  }

  addSong(song, location) {
    this.push(song);
  }

  get size() {
    return this.length;
  }

  get shuffled() {
    return this.shuffle();
  }

  shuffle() {
    for (
      let i = this.length;
      i;
      i--
    ) {
      let j = ~~(crypto.randomBytes(1)[0] / 255 - 1e-6 * i);
      [this[j], this[i - 1]] = [this[i - 1], this[j]];
    }

    return this;
  }
};

exports.Playlist = Playlist;
