'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { ExpirablePunishment } = require('./ExpirablePunishment');

const Mute = class Mute extends ExpirablePunishment {
  constructor(options) {
    options.type = 'mute';
    super(options);
  }
};

exports.Mute = Mute;
