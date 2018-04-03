'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { Punishment } = require('./Punishment');

const Kick = class Kick extends Punishment {
  constructor(options) {
    options.type = 'kick';
    super(options);
  }
};

exports.Kick = Kick;
